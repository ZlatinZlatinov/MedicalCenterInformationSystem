const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Doctor = require('./Doctor');
const User = require('./User');

const Appointments = sequelize.define('Appointments', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'doctors',
            key: 'id',
        },
    },
    patientId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    appointmentTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'canceled', 'no-show'),
        allowNull: false,
        defaultValue: 'pending'
    },
    isInitial: {
        type: DataTypes.BOOLEAN
    },
    isNzok: {
        type: DataTypes.BOOLEAN
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    cancelledAt: {
        type: DataTypes.DATE
    },
    cancelledBy: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    cancellationReason: {
        type: DataTypes.TEXT
    },
    dateTime: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'appointments',
    timestamps: true,
    underscored: true,
    indexes: [
        // CRITICAL: Unique constraint to prevent double bookings
        // Note: MySQL doesn't support partial indexes with WHERE clauses
        // Cancelled appointments exclusion must be handled at application level
        // Using snake_case column names since underscored: true converts camelCase to snake_case
        {
            unique: true,
            fields: ['doctor_id', 'appointment_date', 'appointment_time'],
            name: 'unique_doctor_datetime'
        },
        // Index for faster queries by doctor and date
        {
            fields: ['doctor_id', 'appointment_date'],
            name: 'idx_doctor_appointment_date'
        },
        // Index for faster queries by patient and date
        {
            fields: ['patient_id', 'appointment_date'],
            name: 'idx_patient_appointment_date'
        },
        // Index for status filtering
        {
            fields: ['status'],
            name: 'idx_appointment_status'
        }
    ],
});

Appointments.belongsTo(Doctor, {foreignKey: 'doctorId', as: 'Doctor'});
Appointments.belongsTo(User, {foreignKey: 'patientId', as: 'User'});

// Add validation hooks
Appointments.beforeCreate(async (appointment, options) => {
    // Combine date and time into dateTime
    const dateStr = appointment.appointmentDate;
    const timeStr = appointment.appointmentTime;
    appointment.dateTime = new Date(`${dateStr}T${timeStr}`);
});

Appointments.beforeUpdate(async (appointment, options) => {
    if (appointment.changed('appointmentDate') || appointment.changed('appointmentTime')) {
        const dateStr = appointment.appointmentDate;
        const timeStr = appointment.appointmentTime;
        appointment.dateTime = new Date(`${dateStr}T${timeStr}`);
    }
});

module.exports = Appointments;