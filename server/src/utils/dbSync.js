const { sequelize } = require('../config/db');
const User = require('../models/User');
const EmailToken = require('../models/EmailToken');
const Specialties = require('../models/Specialties');
const Departments = require('../models/Departments');
const Doctor = require('../models/Doctor');
const DoctorSchedule = require('../models/DoctorSchedule');

async function syncDatabase(force = flase) {
    try {
        await sequelize.authenticate();

        if (force) {
            await sequelize.sync({ force: true });
            console.log("Database tables dropped and recreated.");

        } else {
            await sequelize.sync({ alter: true });
            console.log("Database tables synchronized.");
        }

        process.exit(0);
    } catch (error) {
        console.log("Database sync failed: ", error);

        process.exit(1);
    }
}

const forceSync = process.argv.includes('--force');

syncDatabase(forceSync);