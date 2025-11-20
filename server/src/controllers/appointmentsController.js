const { sendAppointmentConfirmationEmail } = require('../config/mail');
const { hasUser, isDoctor } = require('../middlewares/guard');
const { bookAppointment, getAppointmentsForPatient, cancelAppointment, getAppointmentsForDoctor } = require('../services/appointmentsService');
const { errorParser } = require('../utils/errorParser');
const { param, query, validationResult } = require('express-validator');

const appontintmentsController = require('express').Router();
//TODO: add data validation
appontintmentsController.post('/', hasUser(),
    async (req, res) => {
        const { doctorId, doctorName, isInitial, isNzok, appointmentDate, appointmentTime } = req.body;
        const patientId = req.user.id;
        const userEmail = req.user.email;

        try {
            if (!doctorId || !appointmentDate || !appointmentTime) {
                throw new Error("Missing required fields!");
            }

            const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
            if (appointmentDateTime < new Date()) {
                return res.status(400).json({
                    error: 'Cannot book appointments in the past'
                });
            }

            const appointment = await bookAppointment({
                doctorId: parseInt(doctorId),
                patientId,
                isInitial,
                appointmentDate,
                appointmentTime,
                isNzok: isNzok || false
            });

            await sendAppointmentConfirmationEmail(userEmail, doctorName, appointmentDate, appointmentTime);

            res.status(201).json({
                message: 'Appointment booked successfully',
                appointment: {
                    id: appointment.id,
                    doctorId: appointment.doctorId,
                    appointmentDate: appointment.appointmentDate,
                    appointmentTime: appointment.appointmentTime,
                    status: appointment.status,
                    price: appointment.price
                }
            });
        } catch (error) {
            console.log(error);
            const message = errorParser(error);
            res.status(500).json({ message })
        }
    });

// Get upcoming appointments for a patient
appontintmentsController.get('/patient/:patientId',
    hasUser(),
    param('patientId')
        .isUUID()
        .withMessage('Invalid patient ID format'),
    query('status')
        .optional()
        .isIn(['pending', 'confirmed', 'completed', 'canceled', 'no-show'])
        .withMessage('Invalid status. Must be one of: pending, confirmed, completed, canceled, no-show'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { patientId } = req.params;
            const { status } = req.query;

            // Authorization: Users can only view their own appointments (or admin)
            if (req.user.id !== patientId && req.user.role !== 'admin') {
                return res.status(403).json({ 
                    message: 'You are not authorized to view these appointments' 
                });
            }

            const where = { patientId };
            if (status) {
                where.status = status;
            }

            const payload = await getAppointmentsForPatient(where);

            res.status(200).json(payload);
        } catch (error) {
            console.error("Error fetching patient appointments: ", error);
            res.status(500).json({ message: "Failed to fetch appointments" });
        }
    }
);

// Get upcoming appointments for doctor
appontintmentsController.get('/doctor/:doctorId',
    isDoctor(),
    param('doctorId')
        .isInt({ min: 1 })
        .withMessage('Invalid doctor ID format'),
    query('filter')
        .optional()
        .isIn(['today', 'week', 'month', 'all'])
        .withMessage('Invalid filter. Must be one of: today, week, month, all'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const doctorId = parseInt(req.params.doctorId);
            const { filter = 'all' } = req.query;

            // Authorization: Check if user is the doctor or admin
            // Need to verify if req.user.id matches the doctor's userId
            const Doctor = require('../models/Doctor');
            const doctor = await Doctor.findByPk(doctorId);
            
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }

            if (req.user.role !== 'admin' && req.user.id !== doctor.userId) {
                return res.status(403).json({ 
                    message: 'You are not authorized to view these appointments' 
                });
            }

            const payload = await getAppointmentsForDoctor(doctorId, filter);

            res.status(200).json(payload);
        } catch (error) {
            console.error("Error fetching doctor appointments: ", error);
            res.status(500).json({ message: "Failed to fetch appointments" });
        }
    }
);

// Cancel an appointment 
appontintmentsController.patch('/:id/cancel', async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    try {
        const appointment = await cancelAppointment(id, userId, reason);
        res.json(appointment);
    } catch (error) {
        console.error("Oops, something went wrong: ", error);

        res.status(400).json({ message: "Failed to cancel appointment" });
    }
});

module.exports = {
    appontintmentsController
}