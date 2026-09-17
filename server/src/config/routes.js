const { adminController } = require('../controllers/adminController');
const { appontintmentsController } = require('../controllers/appointmentsController');
const { authController } = require('../controllers/authController');
const { doctorController } = require('../controllers/doctorController');
const { documentController } = require('../controllers/documentController');
const { internalController } = require('../controllers/internalController');
const { isAdmin, hasUser } = require('../middlewares/guard');

const routes = require('express').Router();

routes.use('/auth', authController);
routes.use('/admin', isAdmin(), adminController);
routes.use('/doctor', doctorController);
routes.use('/appointments', appontintmentsController);
routes.use('/internal', internalController);
routes.use('/document', hasUser(), documentController);

module.exports = { routes };