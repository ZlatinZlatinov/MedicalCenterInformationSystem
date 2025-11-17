const doctorController = require('express').Router();
const { body, validationResult, param, header, query } = require('express-validator');

const { isDoctor, hasUser } = require('../middlewares/guard');
const { createScheduleForAllDays } = require('../services/doctorSchedule');
const { getDoctorById, getDoctorsByFilters, createDoctor } = require('../services/doctorService');
const { errorParser } = require('../utils/errorParser');
const { upload } = require('../config/fileStorage');
const { getAvailableSlots } = require('../services/appointmentsService');

// Create schedule
doctorController.post('/schedule', isDoctor(),
    header('Authorization').trim().notEmpty().isJWT().bail()
        .withMessage("Authorization header is required!"),
    body('weekdays').notEmpty().isArray()
        .withMessage("Enter valid weekdays format!"),
    body('duration').isInt({ gt: 0, lt: 60 })
        .withMessage("Enter valid schedule duration!"),
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
            res.status(400).json({ message });
        }
    });

// Get doctor details
doctorController.get('/:doctorId',
    param('doctorId').trim().isInt()
        .withMessage("Invalid doctor ID"),
    async (req, res) => {
        const doctorId = req.params.doctorId;
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const payload = await getDoctorById(doctorId);
            res.json(payload);
        } catch (error) {
            console.log("Oops, something went wrong, ", error);
            const message = errorParser(error);
            res.status(404).json({ message });
        }
    });

//Get all doctors 
doctorController.get('/',
    query('departmentId').optional().isInt()
        .withMessage('Invalid department id'),
    query('specialtyId').optional().isInt()
        .withMessage('Invalid specialty id'),
    async (req, res) => {
        const query = req.query;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const filters = {
                departmentId: query.departmentId,
                specialtyId: query.specialtyId,
            };

            const payload = await getDoctorsByFilters(filters);
            res.json(payload);
        } catch (error) {
            console.log("Oops, something went wrong, ", error);
            const message = errorParser(error);
            res.status(404).json({ message });
        }
    });

// Register for a doctor
doctorController.post('/register', hasUser(), upload.single('profilePicture'),
    async (req, res) => {
        const { specialtyId, departmentId, licenseNumber,
            education, description, experience } = req.body;
        const userId = req.user.id;
        const profilePicture = `${process.env.SERVER_URL}/uploads/${req.file.filename}`;

        try {
            const payload = await createDoctor({
                userId,
                specialtyId,
                departmentId,
                licenseNumber,
                education,
                description,
                experience,
                profilePicture,
            });

            res.json(payload);
        } catch (error) {
            console.log("Oops, something went wrong: \n", error);
            const message = errorParser(error);
            res.status(400).json({ message });
        }
    });

// Get availble time slots for a doctor on a specific date
doctorController.get('/:doctorId/schedule', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: "Date parameter is required!" });
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
        }

        const payload = await getAvailableSlots(doctorId, date);
        res.json(payload);
    } catch (error) {
        console.log("Oops, something went wrong: ", error);
        res.status(400).json({ message: "Failed to fetch schedule." });
    }
});

module.exports = {
    doctorController
}