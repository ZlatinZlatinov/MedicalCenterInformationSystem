const Appointments = require('../models/Appointment');
const DoctorSchedule = require('../models/DoctorSchedule');
const { sequelize } = require('../config/db');
const { Transaction, Op } = require('sequelize');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
//TODO: Doctors should not be able to book appointment for themselves

async function createAppointment(appointmentData) {
    console.log(appointmentData);
    return { message: "Appointment created." }
    // return Appointments.create(appointmentData);
}

async function getAvailableSlots(doctorId, date) {
    // Get day of week
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

    // Get doctor's schedule for this day
    const schedule = await DoctorSchedule.findOne({
        where: {
            doctorId: Number(doctorId),
            dayOfWeek,
            isAvailable: true
        }
    });

    if (!schedule) {
        return {
            schedule: null,
            availableSlots: [],
            bookedSlots: []
        };
    }

    // Get all booked appointments for this doctor on this date
    const bookedAppointments = await Appointments.findAll({
        where: {
            doctorId,
            appointmentDate: date,
            status: {
                [Op.notIn]: ['cancelled']
            }
        },
        attributes: ['appointmentTime', 'duration']
    });

    // Generate all possible slots
    const allSlots = generateTimeSlots(
        schedule.startTime,
        schedule.endTime,
        schedule.duration
    );

    // Mark which slots are booked
    const bookedTimes = bookedAppointments.map(apt => apt.appointmentTime);

    const availableSlots = allSlots.filter(slot =>
        !bookedTimes.includes(slot.time)
    );

    return {
        schedule: {
            dayOfWeek: schedule.dayOfWeek,
            isAvailable: schedule.isAvailable,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            duration: schedule.duration,
            price: schedule.price
        },
        availableSlots,
        bookedSlots: bookedTimes.map(time => ({ time }))
    };
}

function generateTimeSlots(startTime, endTime, duration) {
    const slots = [];
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    let current = start;
    while (current < end) {
        const slotEnd = current + duration;
        if (slotEnd <= end) {
            slots.push({
                time: formatTime(current),
                startMinutes: current,
                endMinutes: slotEnd
            });
        }
        current = slotEnd;
    }

    return slots;
}

async function bookAppointment(appointmentData) {
    const { doctorId, patientId, appointmentDate, appointmentTime, isNzok, isInitial } = appointmentData;

    // Use a transaction with proper isolation level
    const result = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    }, async (t) => {

        // 1. Check if doctor has schedule for this day/time
        const dayOfWeek = new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long' });

        const schedule = await DoctorSchedule.findOne({
            where: {
                doctorId,
                dayOfWeek,
                isAvailable: true
            },
            transaction: t,
            lock: t.LOCK.UPDATE // Row-level lock
        });

        if (!schedule) {
            throw new Error('Doctor is not available on this day');
        }

        // 2. Validate time is within schedule
        const requestedTime = parseTime(appointmentTime);
        const scheduleStart = parseTime(schedule.startTime);
        const scheduleEnd = parseTime(schedule.endTime);

        if (requestedTime < scheduleStart || requestedTime >= scheduleEnd) {
            throw new Error('Selected time is outside doctor\'s working hours');
        }

        // 3. Check for conflicts with existing appointments
        const conflictingAppointment = await Appointments.findOne({
            where: {
                doctorId,
                appointmentDate,
                appointmentTime,
                status: {
                    [Op.notIn]: ['cancelled']
                }
            },
            transaction: t,
            lock: t.LOCK.UPDATE // Lock the row if exists
        });

        if (conflictingAppointment) {
            throw new Error('This time slot is already booked');
        }

        // 4. Check patient doesn't have overlapping appointment
        const patientConflict = await Appointments.findOne({
            where: {
                patientId,
                appointmentDate,
                appointmentTime,
                status: {
                    [Op.notIn]: ['cancelled']
                }
            },
            transaction: t
        });

        if (patientConflict) {
            throw new Error('You already have an appointment at this time');
        }

        // 5. Create the appointment
        const appointment = await Appointments.create({
            doctorId,
            patientId,
            appointmentDate,
            appointmentTime,
            duration: schedule.duration,
            price: schedule.price,
            isNzok: isNzok || false,
            isInitial,
            status: 'confirmed'
        }, { transaction: t });

        return appointment;
    });

    return result;
}

async function cancelAppointment(appointmentId, userId, reason) {
    const appointment = await Appointments.findByPk(appointmentId);

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    if (appointment.status === 'cancelled') {
        throw new Error('Appointment is already cancelled');
    }

    // Check if appointment is in the past
    if (new Date(appointment.dateTime) < new Date()) {
        throw new Error('Cannot cancel past appointments');
    }

    await appointment.update({
        status: 'cancelled',
        cancelledAt: new Date(),
        cancelledBy: userId,
        cancellationReason: reason
    });

    return appointment;
}

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`;
}

async function getAppointmentsForPatient(where) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayStr = today.toISOString().split('T')[0];
    const currentTimeStr = now.toTimeString().slice(0, 8);

    // Filter for upcoming appointments only
    const whereClause = {
        patientId: where.patientId,
        [Op.or]: [
            {
                appointmentDate: {
                    [Op.gt]: todayStr
                }
            },
            {
                [Op.and]: [
                    { appointmentDate: todayStr },
                    { appointmentTime: { [Op.gte]: currentTimeStr } }
                ]
            }
        ]
    };

    // Handle status filtering
    if (where.status) {
        // If status is explicitly provided, use it (including 'canceled')
        whereClause.status = where.status;
    } else {
        // Exclude canceled appointments by default
        whereClause.status = {
            [Op.notIn]: ['canceled']
        };
    }

    const appointments = await Appointments.findAll({
        where: whereClause,
        include: [
            {
                model: Doctor,
                as: 'Doctor',
                attributes: ['id', 'userId'],
                include: [{
                    model: User,
                    as: 'User',
                    attributes: ['username', 'email']
                }]
            }
        ],
        attributes: ['id', 'patientId', 'doctorId', 'isInitial', 'appointmentDate', 'appointmentTime', 'status', 'price'],
        order: [['appointmentDate', 'ASC'], ['appointmentTime', 'ASC']]
    });

    return appointments;
}

async function getAppointmentsForDoctor(doctorId, filter = 'all') {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    const currentTimeStr = now.toTimeString().slice(0, 8);

    let dateFilter = {};

    switch (filter) {
        case 'today':
            dateFilter = {
                appointmentDate: todayStr,
                appointmentTime: { [Op.gte]: currentTimeStr }
            };
            break;
        case 'week':
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const nextWeekStr = nextWeek.toISOString().split('T')[0];
            dateFilter = {
                [Op.or]: [
                    {
                        appointmentDate: {
                            [Op.gt]: todayStr
                        }
                    },
                    {
                        [Op.and]: [
                            { appointmentDate: todayStr },
                            { appointmentTime: { [Op.gte]: currentTimeStr } }
                        ]
                    }
                ],
                appointmentDate: {
                    [Op.lte]: nextWeekStr
                }
            };
            break;
        case 'month':
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);
            const nextMonthStr = nextMonth.toISOString().split('T')[0];
            dateFilter = {
                [Op.or]: [
                    {
                        appointmentDate: {
                            [Op.gt]: todayStr
                        }
                    },
                    {
                        [Op.and]: [
                            { appointmentDate: todayStr },
                            { appointmentTime: { [Op.gte]: currentTimeStr } }
                        ]
                    }
                ],
                appointmentDate: {
                    [Op.lte]: nextMonthStr
                }
            };
            break;
        case 'all':
        default:
            // All upcoming appointments
            dateFilter = {
                [Op.or]: [
                    {
                        appointmentDate: {
                            [Op.gt]: todayStr
                        }
                    },
                    {
                        [Op.and]: [
                            { appointmentDate: todayStr },
                            { appointmentTime: { [Op.gte]: currentTimeStr } }
                        ]
                    }
                ]
            };
            break;
    }

    const whereClause = {
        ...dateFilter,
        status: {
            [Op.notIn]: ['canceled'] // Exclude canceled appointments
        }
    };

    const appointments = await Appointments.findAll({
        where: whereClause,
        include: [
            { model: Doctor, as: 'Doctor', where: { userId: doctorId }, attributes: ['id', 'userId'] },
            {
                model: User,
                as: 'User',
                attributes: ['id', 'username', 'email']
            }
        ],
        attributes: ['id', 'patientId', 'isInitial', 'appointmentDate', 'appointmentTime', 'status'],
        order: [['appointmentDate', 'ASC'], ['appointmentTime', 'ASC']]
    });

    const payload = appointments.map((appointment) => {
        const appointmentData = appointment.get({ plain: true });

        return {
            id: appointmentData.id,
            patientId: appointmentData.User.id,
            username: appointmentData.User.username,
            email: appointmentData.User.email,
            appointmentDate: appointmentData.appointmentDate,
            appointmentTime: appointmentData.appointmentTime,
            status: appointmentData.status,
            isInitial: appointmentData.isInitial
        };
    });

    return payload;
}

module.exports = {
    createAppointment,
    getAvailableSlots,
    bookAppointment,
    cancelAppointment,
    getAppointmentsForPatient,
    cancelAppointment,
    getAppointmentsForDoctor,
    testingGetAppointmentsForDoctor
}