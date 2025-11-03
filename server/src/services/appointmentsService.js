const Appointments = require('../models/Appointment');
//TODO:PATIENTS Should not be able to schedule new appointment for the same doctor,
// before their current appointment hasnt passed
async function createAppointment(appointmentData) {
    return Appointments.create(appointmentData);
}

module.exports = {
    createAppointment
}