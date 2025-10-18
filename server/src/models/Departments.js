const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');  

const Departments = sequelize.define('Departments', {
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
    tableName: 'departments',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
}); 

module.exports = Departments;