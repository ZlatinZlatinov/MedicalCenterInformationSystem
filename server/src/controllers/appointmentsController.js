const { sendAppointmentConfirmationEmail } = require('../config/mail');
const { hasUser } = require('../middlewares/guard');
const { bookAppointment } = require('../services/appointmentsService');
const { errorParser } = require('../utils/errorParser');

const appontintmentsController = require('express').Router();
//TODO: add data validation
appontintmentsController.post('/', hasUser(),
    async (req, res) => {
        const { doctorId, doctorName, isInitial, isNzok, price, appointmentDate, appointmentTime } = req.body;
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
                price,
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

module.exports = {
    appontintmentsController
}