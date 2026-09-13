const { hasUser } = require('../middlewares/guard');
const { getSpecialtiesAndDepartments } = require('../services/internalService');
const { errorParser } = require('../utils/errorParser');

const internalController = require('express').Router();

internalController.get('/specialties-departments', hasUser(), async (req, res) => {
    try {
        const result = await getSpecialtiesAndDepartments();
        res.json(result);
    } catch (error) {
        const message = errorParser(error);
        res.status(500).json({ message });
    }
});

module.exports = {
    internalController
};