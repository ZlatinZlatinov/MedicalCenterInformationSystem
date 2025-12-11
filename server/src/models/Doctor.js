const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Departments = require('./Departments');
const Specialties = require('./Specialties');
//TODO: Update doctor model, too much collumns
const Doctor = sequelize.define('Doctor', {
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
    specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'specialties',
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
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    education: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    experience: {
        type: DataTypes.INTEGER
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isNzok: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.jpg',
    },
}, {
    tableName: 'doctors',
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

Doctor.belongsTo(User, { foreignKey: 'userId', as: 'User' });
Doctor.belongsTo(Departments, { foreignKey: 'departmentId', as: 'Department' });
Doctor.belongsTo(Specialties, { foreignKey: 'specialtyId', as: 'Specialty' });

module.exports = Doctor;