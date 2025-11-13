const Doctor = require('../models/Doctor');

async function getDoctorById(doctorId) {
    return Doctor.findByPk(doctorId);
}

async function getDoctorsByFilters(filters) {
    const where = {};

    // Dynamically add filters based on available query parameters
    if (filters.departmentId) where.departmentId = filters.departmentId;
    if (filters.specialtyId) where.specialtyId = filters.specialtyId;

    return Doctor.findAll({ where });
}

module.exports = {
    getDoctorById,
    getDoctorsByFilters
}