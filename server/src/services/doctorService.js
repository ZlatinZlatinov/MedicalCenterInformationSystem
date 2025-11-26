const { sendDoctorApprovalEmail } = require('../config/mail');
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
            { model: User, as: 'User', attributes: ['username', 'phoneNumber'], required: false },
            { model: Departments, as: 'Department', attributes: ['name'] },
            { model: Specialties, as: 'Specialty', attributes: ['name'] },
        ],
        attributes: ['profilePicture', 'education', 'description', 'experience', 'isNzok'],
    });

    const doctorData = doctor.get({ plain: true });

    return {
        imgSrc: doctorData.profilePicture,
        doctorName: doctorData.User?.username,
        department: doctorData.Department?.name || null,
        specialty: doctorData.Specialty?.name || null,
        experience: doctorData.experience,
        description: doctorData.description,
        education: doctorData.education,
        phoneNumber: doctorData.User?.phoneNumber,
        isNzok: doctorData.isNzok
    };
}

async function getDoctorsByFilters(filters) {
    // Build include array with conditional filtering on related tables
    const includes = [
        {
            model: User,
            as: 'User',
            attributes: ['username'],
            required: false
        }
    ];

    // Add Department include with conditional filtering
    const departmentInclude = {
        model: Departments,
        as: 'Department',
        attributes: ['name'],
        required: false,
    };
    if (filters.department) {
        departmentInclude.where = { name: filters.department };
        departmentInclude.required = true;
    }
    includes.push(departmentInclude);

    // Add Specialty include with conditional filtering
    const specialtyInclude = {
        model: Specialties,
        as: 'Specialty',
        attributes: ['name'],
        required: false,
    };
    if (filters.specialty) {
        specialtyInclude.where = { name: filters.specialty };
        specialtyInclude.required = true;
    }
    includes.push(specialtyInclude);

    const doctors = await Doctor.findAll({
        include: includes,
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

async function approveDoctor(doctorId) {
    const doctor = await Doctor.findOne({
        where: {
            id: doctorId
        },
        include: [
            { model: User, as: 'User', attributes: ['email', 'username'] },
            { model: Specialties, as: 'Specialty', attributes: ['name'] }
        ]
    });

    await doctor.update({
        isActive: true
    });

    const doctorData = doctor.get({ plain: true });
    await sendDoctorApprovalEmail(doctorData.User.email, doctorData.User.username);

    return {
        imgSrc: doctorData.profilePicture,
        doctorName: doctorData.User?.username,
        specialty: doctorData.Specialty.name || null,
        experience: doctorData.experience,
        description: doctorData.description,
        education: doctorData.education
    }
}

async function declineDoctor(doctorId) {
    const doctor = await Doctor.findOne({
        where: {
            id: doctorId
        },
        include: [
            { model: User, as: 'User', attributes: ['email', 'username'] },
            { model: Specialties, as: 'Specialty', attributes: ['name'] }
        ]
    });

    await doctor.update({
        isActive: false
    });

    const doctorData = doctor.get({ plain: true });

    return {
        imgSrc: doctorData.profilePicture,
        doctorName: doctorData.User?.username,
        specialty: doctorData.Specialty.name || null,
        experience: doctorData.experience,
        description: doctorData.description,
        education: doctorData.education
    }
}

module.exports = {
    getDoctorById,
    getDoctorsByFilters,
    createDoctor,
    approveDoctor,
    declineDoctor
}