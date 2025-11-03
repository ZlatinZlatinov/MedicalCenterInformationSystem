const { createAppointment } = require('../services/appointmentsService');
const { errorParser } = require('../utils/errorParser');

const appontintmentsController = require('express').Router();

appontintmentsController.post('/', async (req, res) => {
    const { patientId, doctorId, isInitial, isNzok, price, dateTime } = req.body;

    try {
        const payload = await createAppointment({ patientId, doctorId, isInitial, isNzok, price, dateTime });
        res.json(payload);
    } catch (error) {
        console.log(error);
        const message = errorParser(error);
        res.status(500).json({ message })
    }
});

module.exports = {
    appontintmentsController
}