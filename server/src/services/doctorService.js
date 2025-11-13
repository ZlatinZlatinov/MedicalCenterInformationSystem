const Departments = require('../models/Departments');
const Doctor = require('../models/Doctor');
const Specialties = require('../models/Specialties');
const User = require('../models/User');

async function getDoctorById(doctorId) {
    return Doctor.findByPk(doctorId);
}

async function getDoctorsByFilters(filters) {
    const where = {};

    // Dynamically add filters based on available query parameters
    if (filters.departmentId) where.departmentId = filters.departmentId;
    if (filters.specialtyId) where.specialtyId = filters.specialtyId;

    const doctors = await Doctor.findAll({
        where,
        include: [
            {
                model: User,
                as: 'User',
                attributes: ['username'],
                required: false
            },
            {
                model: Departments,
                as: 'Department',
                attributes: ['name'],
                required: false
            },
            {
                model: Specialties,
                as: 'Specialty',
                attributes: ['name'],
                required: false
            }
        ],
        attributes: ['id', 'profilePicture', 'experience']
    });

    // Transform the response to return flat structure
    return doctors.map(doctor => {
        const doctorData = doctor.get({ plain: true });
        return {
            username: doctorData.User?.username || null,
            doctorId: doctorData.id,
            profilePicture: doctorData.profilePicture,
            department: doctorData.Department?.name || null,
            specialty: doctorData.Specialty?.name || null,
            experience: doctorData.experience
        };
    });
}

module.exports = {
    getDoctorById,
    getDoctorsByFilters
}