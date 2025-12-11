const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Nurse = sequelize.define('Nurse', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id',
        },
    },
    specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'specialties',
            key: 'id',
        },
    },
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    experience: {
        type: DataTypes.INTEGER,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.jpg',
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'nurse',
    timestamps: true,
    underscored: true,
});

module.exports = Nurse;