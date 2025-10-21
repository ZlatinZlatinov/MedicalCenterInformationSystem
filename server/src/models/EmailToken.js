const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 
const crypto = require('crypto');
const User = require('./User'); 

const EmailToken = sequelize.define('EmailToken', {
    token:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}); 

User.hasOne(EmailToken, {onDelete: 'CASCADE'});
EmailToken.belongsTo(User); 

EmailToken.beforeCreate((tokenInstance)=> {
    tokenInstance.token = crypto.randomBytes(32).toString('hex');
    tokenInstance.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
}); 

module.exports = EmailToken;
