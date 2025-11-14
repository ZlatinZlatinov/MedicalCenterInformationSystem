const Departments = require('../models/Departments');
const Doctor = require('../models/Doctor');
const Specialties = require('../models/Specialties');
const User = require('../models/User');

async function getDoctorById(doctorId) {
    const doctor = await Doctor.findOne({
        where: {
            id: doctorId
        },
        include: [
            { model: User, as: 'User', attributes: ['username'], required: false },
            { model: Departments, as: 'Department', attributes: ['name'] },
            { model: Specialties, as: 'Specialty', attributes: ['name'] },
        ],
        attributes: ['profilePicture', 'education', 'description', 'experience'],
    });

    const doctorData = doctor.get({ plain: true });

    return {
        imgSrc: doctorData.profilePicture,
        doctorName: doctorData.User?.username,
        department: doctorData.Department?.name || null,
        specialty: doctorData.Specialty.name || null,
        experience: doctorData.experience,
        description: doctorData.description,
        education: doctorData.education
    };
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

async function createDoctor(payload) {
    return Doctor.create(payload);
}

module.exports = {
    getDoctorById,
    getDoctorsByFilters,
    createDoctor
}