const Departments = require("../models/Departments");
const Specialties = require("../models/Specialties");

async function getSpecialtiesAndDepartments() {
    const specialties = await Specialties.findAll();
    const departments = await Departments.findAll();

    return {
        specialties,
        departments
    };
}

module.exports = {
    getSpecialtiesAndDepartments
}