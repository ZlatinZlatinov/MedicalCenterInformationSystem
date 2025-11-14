const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 
//TODO: update specialties to have departmentId
const Specialties = sequelize.define('Specialties', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'specialties',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
}); 

module.exports = Specialties;