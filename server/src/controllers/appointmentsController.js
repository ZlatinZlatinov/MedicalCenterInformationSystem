const { bookAppointment } = require('../services/appointmentsService');
const { errorParser } = require('../utils/errorParser');

const appontintmentsController = require('express').Router();

appontintmentsController.post('/', async (req, res) => {
    const { doctorId, isInitial, isNzok, price, appointmentDate, appointmentTime } = req.body;
    const patientId = req.user.id;

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