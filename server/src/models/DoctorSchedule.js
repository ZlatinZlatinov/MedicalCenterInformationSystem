const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DoctorSchedule = sequelize.define('doctors_schedule', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'doctors',
            key: 'id'
        }
    },
    dayOfWeek: {
        type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    startTime: {
        type: DataTypes.TIME
    },
    endTime: {
        type: DataTypes.TIME
    },
    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 30
    },
    isFree: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    }
}, {
    tableName: 'doctors_schedule',
    timestamps: true,
    underscored: true
});

module.exports = DoctorSchedule;