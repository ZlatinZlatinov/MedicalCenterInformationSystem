const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 
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
    departmentId:{
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
    pricePerHour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.jpg',
    },
    availability: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
}, {
    tableName: 'doctors',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    hooks: {
        beforeCreate: async (doctor) => {
            doctor.availability = JSON.stringify(doctor.availability);
        },
    }
}); 

module.exports = Doctor;