const { authController } = require('../controllers/authController');


const routes = require('express').Router();

routes.use('/auth', authController);

module.exports = { routes };