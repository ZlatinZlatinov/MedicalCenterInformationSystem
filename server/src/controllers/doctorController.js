const { createScheduleForAllDays } = require('../services/doctorSchedule');
const { errorParser } = require('../utils/errorParser');

const doctorController = require('express').Router();

doctorController.post('/schedule', async (req, res) => {
    const { weekDays, duration, isFree, price } = req.body;
    //TODO: const doctorId = req.doctor.id;

    try {
        const payload = await createScheduleForAllDays(weekDays, duration, isFree, price);
        res.json(payload);
    } catch (error) {
        const message = errorParser(error);
        console.log("Oops, something went wrong: ", message);
        res.status(500).json({ message });
    }
});

module.exports = {
    doctorController
}