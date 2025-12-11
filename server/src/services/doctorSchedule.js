const DoctorSchedule = require('../models/DoctorSchedule');
const Doctor = require('../models/Doctor');

async function createSchedule(scheduleData) {
    return DoctorSchedule.create(scheduleData);
}

async function createScheduleForAllDays(weekDays, duration, isFree, price, userId) {
    const doctorDetails = await Doctor.findOne({
        where: { userId },
        attributes: ['id', 'userId']
    })

    const doctorId = doctorDetails.id;

    for (let { dayOfWeek, isAvailable, startTime, endTime } of weekDays) {
        await createSchedule({
            doctorId: doctorId,
            dayOfWeek,
            isAvailable,
            startTime,
            endTime,
            duration,
            isFree,
            price
        });
    }

    return { message: "Created!" };
}

module.exports = {
    createSchedule,
    createScheduleForAllDays
}