const { createScheduleForAllDays } = require('../services/doctorSchedule');
const { errorParser } = require('../utils/errorParser');

const doctorController = require('express').Router();
const { body, validationResult, param, header } = require('express-validator');

doctorController.post('/schedule',
    header('Authorization').trim().notEmpty().isJWT()
        .withMessage("Authorization header is required!"),
    body('weekdays').notEmpty().isArray()
        .withMessage("Enter valid weekdays format"),
    body('duration').isInt({ gt: 0, lt: 60 })
        .withMessage("Enter valid schedule duration"),
    body('isFree').isBoolean()
        .withMessage("Enter valid boolean option!"),
    body('price').isFloat({ gt: 0, lt: 500 })
        .withMessage("Enter valid price number between 0 and 500!"),
    body('doctorId').isInt().withMessage("Invalid doctor id!"),
    async (req, res) => {
        const { weekDays, duration, isFree, price, doctorId } = req.body;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const payload = await createScheduleForAllDays(weekDays, duration, isFree, price, doctorId);
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