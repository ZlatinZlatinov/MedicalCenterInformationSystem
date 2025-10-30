const { authController } = require('../controllers/authController');
const { doctorController } = require('../controllers/doctorController');


const routes = require('express').Router();

routes.use('/auth', authController);
routes.use('/doctor', doctorController);

module.exports = { routes };