const DoctorSchedule = require('../models/DoctorSchedule');

async function createSchedule(scheduleData) {
    return DoctorSchedule.create(scheduleData);
}

async function createScheduleForAllDays(weekDays, duration, isFree, price, doctorId) {

    for (let { dayOfWeek, isAvailable, startTime, endTime } of weekDays) {
        await createSchedule({
            doctorId: 2,
            dayOfWeek,
            isAvailable,
            startTime,
            endTime,
            duration,
            isFree,
            price
        });
    }

    return { message: "Created!" };
}

module.exports = {
    createSchedule,
    createScheduleForAllDays
}