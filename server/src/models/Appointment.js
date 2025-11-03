const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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
    duraion: {
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
        {
            unique: true,
            fields: ['doctorId', 'appointmentDate', 'appointmentTime'],
            name: 'unique_doctor_datetime',
            where: {
                status: {
                    [sequelize.Sequelize.Op.notIn]: ['cancelled']
                }
            }
        },
        // Index for faster queries
        {
            fields: ['doctorId', 'appointmentDate']
        },
        {
            fields: ['patientId', 'appointmentDate']
        },
        {
            fields: ['status']
        }
    ],
});

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