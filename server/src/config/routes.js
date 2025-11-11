const { appontintmentsController } = require('../controllers/appointmentsController');
const { authController } = require('../controllers/authController');
const { doctorController } = require('../controllers/doctorController');
const { isDoctor } = require('../middlewares/guard');


const routes = require('express').Router();

routes.use('/auth', authController);
routes.use('/doctor', isDoctor(), doctorController);
routes.use('/appointments', appontintmentsController);

module.exports = { routes };