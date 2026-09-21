const { DateTime } = require('luxon');

const CLINIC_TZ = 'Europe/Sofia'; 

const nowInClinic = () => DateTime.now().setZone(CLINIC_TZ);

// Strict 'YYYY-MM-DD' parsing: a full ISO timestamp is rejected instead of silently shifting the day
function getDayOfWeek(dateStr) {
    const dt = DateTime.fromFormat(dateStr, 'yyyy-MM-dd', { zone: CLINIC_TZ });
    if (!dt.isValid) throw new Error('Invalid date format, expected YYYY-MM-DD');
    return dt.setLocale('en').weekdayLong; // "Monday", "Tuesday", ...
}

function toClinicDateTime(dateStr, timeStr) {
    return DateTime.fromFormat(
        `${dateStr} ${timeStr.slice(0, 5)}`,
        'yyyy-MM-dd HH:mm',
        { zone: CLINIC_TZ }
    ).toJSDate();
} 

module.exports = {
    CLINIC_TZ, 
    nowInClinic, 
    getDayOfWeek, 
    toClinicDateTime
}