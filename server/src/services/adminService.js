const Doctor = require("../models/Doctor");
const User = require('../models/User');
const Specialties = require('../models/Specialties');

async function getPendingUsers(filter) {
    const where = {};
    console.log(filter);
    if (filter === "pending" || filter === "declined") {
        where.isActive = false;
    } else if (filter === "doctors" || filter === "approved") {
        where.isActive = true;
    }

    const doctors = await Doctor.findAll({
        where,
        include: [
            { model: User, as: 'User', attributes: ['id', 'username', 'email', 'role'], required: false },
            { model: Specialties, as: 'Specialty', attributes: ['name'] },
        ],
        attributes: ['id', 'profilePicture'],
    });

    const payload = doctors.map((d) => {
        const doctorData = d.get({ plain: true });

        return {
            userId: doctorData.User?.id,
            username: doctorData.User?.username,
            email: doctorData.User?.email,
            type: doctorData.User?.role,
            doctorId: doctorData.id,
            profilePicture: doctorData.profilePicture,
            specialization: doctorData.Specialty?.name
        }
    });

    return payload;
}

module.exports = {
    getPendingUsers
}