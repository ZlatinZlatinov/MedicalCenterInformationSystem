require('dotenv').config();
const { sequelize } = require('../config/db');
const User = require('../models/User');
const Departments = require('../models/Departments');
const Specialties = require('../models/Specialties');
const Doctor = require('../models/Doctor');
const Nurse = require('../models/Nurse');
const DoctorSchedule = require('../models/DoctorSchedule');
const Appointments = require('../models/Appointment');

// Unsplash photo IDs for profile pictures
const DOCTOR_PHOTOS = [
    '1559839734-2ae71ceb95a6', // Professional doctor
    '1612349317150-e413f6a5b16d', // Female doctor
    '1582750433139-0321e93e927f', // Doctor with stethoscope
    '1551601651-2a8555f1a136', // Male doctor
    '1576091160399-112ba8d25d1f', // Doctor portrait
    '1607990281513-53c54ed90e93', // Professional female doctor
    '1594824476965-e3819d0d8e5b', // Doctor in lab coat
    '1607990281513-53c54ed90e93', // Medical professional
    '1551601651-2a8555f1a136', // Doctor smiling
    '1612349317150-e413f6a5b16d', // Healthcare professional
    '1582750433139-0321e93e927f', // Doctor consultation
    '1559839734-2ae71ceb95a6', // Medical expert
    '1576091160399-112ba8d25d1f', // Healthcare provider
    '1607990281513-53c54ed90e93', // Professional doctor
    '1594824476965-e3819d0d8e5b'  // Medical staff
];

const NURSE_PHOTOS = [
    '1559839734-2ae71ceb95a6', // Professional nurse
    '1612349317150-e413f6a5b16d', // Female nurse
    '1582750433139-0321e93e927f', // Nurse with patient
    '1551601651-2a8555f1a136', // Healthcare nurse
    '1576091160399-112ba8d25d1f'  // Professional nurse
];

// Mock data arrays
const BULGARIAN_FIRST_NAMES = [
    'Иван', 'Мария', 'Георги', 'Елена', 'Димитър', 'Анна', 'Петър', 'Светла',
    'Николай', 'Ивана', 'Стоян', 'Румяна', 'Красимир', 'Весела', 'Борис',
    'Даниела', 'Васил', 'Галина', 'Стефан', 'Йорданка', 'Александър', 'Пенка',
    'Мартин', 'Радослава', 'Тодор', 'Снежана', 'Калин', 'Цветана', 'Росен', 'Симона'
];

const BULGARIAN_LAST_NAMES = [
    'Иванов', 'Петров', 'Георгиев', 'Димитров', 'Стоянов', 'Николов', 'Караджов',
    'Попов', 'Тодоров', 'Ангелов', 'Василев', 'Стефанов', 'Марков', 'Кирилов',
    'Атанасов', 'Христов', 'Янев', 'Стоилов', 'Павлов', 'Ковачев', 'Михайлов',
    'Димитрова', 'Петрова', 'Иванова', 'Георгиева', 'Стоянова', 'Николова', 'Попова'
];

const MEDICAL_DESCRIPTIONS = [
    'Опитен специалист с дългогодишен опит в диагностиката и лечението на различни заболявания.',
    'Висококвалифициран лекар, посветен на предоставянето на най-добрата грижа за пациентите.',
    'Специалист с доказан опит в областта, използващ най-модерните методи на лечение.',
    'Предан професионалист, фокусиран върху превенцията и лечението на заболявания.',
    'Опитен лекар с отлично разбиране на съвременната медицина и персонализиран подход.',
    'Високо квалифициран специалист, известен с внимателния си подход към всеки пациент.',
    'Професионалист с богат опит в диагностиката и лечението на сложни медицински случаи.',
    'Посветен лекар, използващ най-новите постижения в медицината за оптимални резултати.'
];

const EDUCATION_OPTIONS = [
    'Медицински университет - София',
    'Медицински университет - Пловдив',
    'Медицински университет - Варна',
    'Медицински университет - Плевен',
    'Медицински университет - Стара Загора'
];

// Helper function to get random element from array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random number in range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate random date
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to format time as HH:MM
function formatTime(hours, minutes = 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
}

// Helper function to get Unsplash URL
function getUnsplashUrl(photoId, width = 400, height = 400) {
    return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop`;
}

// Clear all tables in reverse dependency order
async function clearTables() {
    console.log('Clearing existing data...');
    try {
        await Appointments.destroy({ where: {}, force: true });
        await DoctorSchedule.destroy({ where: {}, force: true });
        await Doctor.destroy({ where: {}, force: true });
        await Nurse.destroy({ where: {}, force: true });
        await User.destroy({ where: {}, force: true });
        await Specialties.destroy({ where: {}, force: true });
        await Departments.destroy({ where: {}, force: true });
        console.log('All tables cleared successfully.');
    } catch (error) {
        console.error('Error clearing tables:', error);
        throw error;
    }
}

// Seed Departments
async function seedDepartments(transaction) {
    const departments = [
        { name: 'Кардиология' },
        { name: 'Неврология' },
        { name: 'Педиатрия' },
        { name: 'Ортопедия' },
        { name: 'Дерматология' },
        { name: 'Офталмология' },
        { name: 'Стоматология' },
        { name: 'Психиатрия' }
    ];

    const createdDepartments = await Departments.bulkCreate(departments, { transaction });
    console.log(`✓ Seeded ${createdDepartments.length} departments`);
    return createdDepartments;
}

// Seed Specialties
async function seedSpecialties(transaction) {
    const specialties = [
        { name: 'Кардиолог' },
        { name: 'Невролог' },
        { name: 'Педиатър' },
        { name: 'Ортопед' },
        { name: 'Дерматолог' },
        { name: 'Офталмолог' },
        { name: 'Стоматолог' },
        { name: 'Психиатър' },
        { name: 'Хирург' },
        { name: 'Гастроентеролог' },
        { name: 'Ендокринолог' },
        { name: 'Уролог' },
        { name: 'Гинеколог' },
        { name: 'Онколог' },
        { name: 'Пулмолог' }
    ];

    const createdSpecialties = await Specialties.bulkCreate(specialties, { transaction });
    console.log(`✓ Seeded ${createdSpecialties.length} specialties`);
    return createdSpecialties;
}

// Seed Users
async function seedUsers(transaction) {
    const users = [];
    const defaultPassword = 'Password123!';
    
    // Admin users (1-2)
    const adminCount = getRandomInt(1, 2);
    for (let i = 0; i < adminCount; i++) {
        const firstName = getRandomElement(BULGARIAN_FIRST_NAMES);
        const lastName = getRandomElement(BULGARIAN_LAST_NAMES);
        users.push({
            username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
            email: `admin${i + 1}@medicalcenter.bg`,
            password: defaultPassword,
            role: 'admin',
            provider: 'local',
            isVerified: true,
            phoneNumber: `+3598${getRandomInt(10000000, 99999999)}`
        });
    }

    // Patient users (5-10)
    const patientCount = getRandomInt(5, 10);
    for (let i = 0; i < patientCount; i++) {
        const firstName = getRandomElement(BULGARIAN_FIRST_NAMES);
        const lastName = getRandomElement(BULGARIAN_LAST_NAMES);
        users.push({
            username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.patient`,
            email: `patient${i + 1}@example.bg`,
            password: defaultPassword,
            role: 'user',
            provider: 'local',
            isVerified: true,
            phoneNumber: `+3598${getRandomInt(10000000, 99999999)}`
        });
    }

    // Doctor users (8-15)
    const doctorCount = getRandomInt(8, 15);
    for (let i = 0; i < doctorCount; i++) {
        const firstName = getRandomElement(BULGARIAN_FIRST_NAMES);
        const lastName = getRandomElement(BULGARIAN_LAST_NAMES);
        users.push({
            username: `dr.${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
            email: `doctor${i + 1}@medicalcenter.bg`,
            password: defaultPassword,
            role: 'doctor',
            provider: 'local',
            isVerified: true,
            phoneNumber: `+3598${getRandomInt(10000000, 99999999)}`
        });
    }

    // Nurse users (3-5)
    const nurseCount = getRandomInt(3, 5);
    for (let i = 0; i < nurseCount; i++) {
        const firstName = getRandomElement(BULGARIAN_FIRST_NAMES);
        const lastName = getRandomElement(BULGARIAN_LAST_NAMES);
        users.push({
            username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.nurse`,
            email: `nurse${i + 1}@medicalcenter.bg`,
            password: defaultPassword,
            role: 'nurse',
            provider: 'local',
            isVerified: true,
            phoneNumber: `+3598${getRandomInt(10000000, 99999999)}`
        });
    }

    const createdUsers = await User.bulkCreate(users, { transaction });
    console.log(`✓ Seeded ${createdUsers.length} users (${adminCount} admin, ${patientCount} patients, ${doctorCount} doctors, ${nurseCount} nurses)`);
    return createdUsers;
}

// Seed Doctors
async function seedDoctors(users, departments, specialties, transaction) {
    const doctorUsers = users.filter(u => u.role === 'doctor');
    const doctors = [];
    let photoIndex = 0;

    for (let i = 0; i < doctorUsers.length; i++) {
        const user = doctorUsers[i];
        const department = getRandomElement(departments);
        const specialty = getRandomElement(specialties);
        
        doctors.push({
            userId: user.id,
            specialtyId: specialty.id,
            departmentId: department.id,
            licenseNumber: `MD-${getRandomInt(10000, 99999)}-${getRandomInt(2000, 2024)}`,
            education: getRandomElement(EDUCATION_OPTIONS),
            description: getRandomElement(MEDICAL_DESCRIPTIONS),
            experience: getRandomInt(2, 25),
            isActive: Math.random() > 0.2, // 80% active
            isNzok: Math.random() > 0.4, // 60% accept NZOK
            profilePicture: getUnsplashUrl(DOCTOR_PHOTOS[photoIndex % DOCTOR_PHOTOS.length])
        });
        photoIndex++;
    }

    const createdDoctors = await Doctor.bulkCreate(doctors, { transaction });
    console.log(`✓ Seeded ${createdDoctors.length} doctors`);
    return createdDoctors;
}

// Seed Nurses
async function seedNurses(users, departments, specialties, transaction) {
    const nurseUsers = users.filter(u => u.role === 'nurse');
    const nurses = [];
    let photoIndex = 0;

    for (let i = 0; i < nurseUsers.length; i++) {
        const user = nurseUsers[i];
        const department = getRandomElement(departments);
        const specialty = getRandomElement(specialties);
        
        nurses.push({
            userId: user.id,
            departmentId: department.id,
            specialtyId: specialty.id,
            licenseNumber: `RN-${getRandomInt(10000, 99999)}-${getRandomInt(2000, 2024)}`,
            experience: getRandomInt(1, 20),
            profilePicture: getUnsplashUrl(NURSE_PHOTOS[photoIndex % NURSE_PHOTOS.length]),
            isActive: Math.random() > 0.2 // 80% active
        });
        photoIndex++;
    }

    const createdNurses = await Nurse.bulkCreate(nurses, { transaction });
    console.log(`✓ Seeded ${createdNurses.length} nurses`);
    return createdNurses;
}

// Seed Doctor Schedules
async function seedDoctorSchedules(doctors, transaction) {
    const schedules = [];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
        { start: 8, end: 12 },   // Morning
        { start: 13, end: 17 },  // Afternoon
        { start: 9, end: 13 },   // Mid-morning
        { start: 14, end: 18 }   // Mid-afternoon
    ];

    for (const doctor of doctors) {
        if (!doctor.isActive) continue;

        // Each doctor has schedule for weekdays (Monday-Friday)
        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
            const day = daysOfWeek[dayIndex];
            const timeSlot = getRandomElement(timeSlots);
            const isAvailable = Math.random() > 0.1; // 90% available
            
            if (isAvailable) {
                schedules.push({
                    doctorId: doctor.id,
                    dayOfWeek: day,
                    isAvailable: true,
                    startTime: formatTime(timeSlot.start),
                    endTime: formatTime(timeSlot.end),
                    duration: getRandomElement([30, 45, 60]),
                    isFree: Math.random() > 0.3, // 70% free appointments
                    price: Math.random() > 0.3 ? getRandomInt(50, 200) : 0
                });
            }
        }
    }

    const createdSchedules = await DoctorSchedule.bulkCreate(schedules, { transaction });
    console.log(`✓ Seeded ${createdSchedules.length} doctor schedule entries`);
    return createdSchedules;
}

// Seed Appointments
async function seedAppointments(doctors, users, transaction) {
    const patientUsers = users.filter(u => u.role === 'user');
    const activeDoctors = doctors.filter(d => d.isActive);
    const appointments = [];
    const statuses = ['pending', 'confirmed', 'completed', 'canceled', 'no-show'];
    
    // Track used time slots to avoid duplicates (doctorId + date + time)
    const usedSlots = new Set();
    
    // Generate appointments for the past 30 days and next 60 days
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 30);
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 60);

    const appointmentCount = getRandomInt(20, 40);
    let attempts = 0;
    const maxAttempts = appointmentCount * 10; // Prevent infinite loops
    
    while (appointments.length < appointmentCount && attempts < maxAttempts) {
        attempts++;
        const doctor = getRandomElement(activeDoctors);
        const patient = getRandomElement(patientUsers);
        const appointmentDate = getRandomDate(pastDate, futureDate);
        const dateStr = appointmentDate.toISOString().split('T')[0];
        
        // Generate random time between 8:00 and 17:00
        const hour = getRandomInt(8, 17);
        const minute = getRandomElement([0, 15, 30, 45]);
        const appointmentTime = formatTime(hour, minute);
        
        // Check for duplicate slot
        const slotKey = `${doctor.id}-${dateStr}-${appointmentTime}`;
        if (usedSlots.has(slotKey)) {
            continue; // Skip this iteration, try again
        }
        usedSlots.add(slotKey);
        
        const status = getRandomElement(statuses);
        const isInitial = Math.random() > 0.5;
        const isNzok = doctor.isNzok && Math.random() > 0.4;
        const duration = getRandomElement([30, 45, 60]);
        const price = isNzok ? 0 : getRandomInt(50, 200);
        
        const appointment = {
            doctorId: doctor.id,
            patientId: patient.id,
            appointmentDate: dateStr,
            appointmentTime: appointmentTime,
            status: status,
            isInitial: isInitial,
            isNzok: isNzok,
            duration: duration,
            price: price
        };

        // Add cancellation info if canceled
        if (status === 'canceled') {
            appointment.cancelledAt = new Date(appointmentDate.getTime() - getRandomInt(1, 7) * 24 * 60 * 60 * 1000);
            appointment.cancelledBy = Math.random() > 0.5 ? patient.id : null;
            appointment.cancellationReason = getRandomElement([
                'Промяна в графика',
                'Лични причини',
                'Заболяване',
                'Друга причина'
            ]);
        }

        appointments.push(appointment);
    }

    if (appointments.length < appointmentCount) {
        console.log(`⚠ Warning: Only created ${appointments.length} appointments (requested ${appointmentCount}) due to slot conflicts`);
    }

    const createdAppointments = await Appointments.bulkCreate(appointments, { transaction });
    console.log(`✓ Seeded ${createdAppointments.length} appointments`);
    return createdAppointments;
}

// Main seeding function
async function seedDatabase(clearFirst = false) {
    const transaction = await sequelize.transaction();
    
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');

        if (clearFirst) {
            await clearTables();
        }

        console.log('\nStarting database seeding...\n');

        // Seed in dependency order
        const departments = await seedDepartments(transaction);
        const specialties = await seedSpecialties(transaction);
        const users = await seedUsers(transaction);
        const doctors = await seedDoctors(users, departments, specialties, transaction);
        const nurses = await seedNurses(users, departments, specialties, transaction);
        const schedules = await seedDoctorSchedules(doctors, transaction);
        const appointments = await seedAppointments(doctors, users, transaction);

        await transaction.commit();
        
        console.log('\n✓ Database seeding completed successfully!');
        console.log('\nSummary:');
        console.log(`  - Departments: ${departments.length}`);
        console.log(`  - Specialties: ${specialties.length}`);
        console.log(`  - Users: ${users.length}`);
        console.log(`  - Doctors: ${doctors.length}`);
        console.log(`  - Nurses: ${nurses.length}`);
        console.log(`  - Doctor Schedules: ${schedules.length}`);
        console.log(`  - Appointments: ${appointments.length}`);
        console.log('\nDefault password for all users: Password123!');
        
        process.exit(0);
    } catch (error) {
        await transaction.rollback();
        console.error('\n✗ Database seeding failed:', error);
        process.exit(1);
    }
}

// Check for --clear flag
const clearFirst = process.argv.includes('--clear');

// Run seeding
seedDatabase(clearFirst);

