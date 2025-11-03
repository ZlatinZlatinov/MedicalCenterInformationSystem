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
        references: {
            model: 'users',
            key: 'id',
        },
    },
    isInitial: {
        type: DataTypes.BOOLEAN
    },
    isNzok: {
        type: DataTypes.BOOLEAN
    },
    price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    dateTime: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'appointments',
    timestamps: true,
    underscored: true
});

module.exports = Appointments;