const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const crypto = require('crypto');
const User = require('./User');

// TODO: Check for allowNull and beforeCreate options
// Not sure if creating user triggers an error and when 
// beforeCreate is triggered.

const EmailToken = sequelize.define('EmailToken', {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    token: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        // allowNull: false,
    },
}, {
    tableName: 'emailtoken',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
    hooks: {
        beforeCreate: (tokenInstance) => {
            tokenInstance.token = crypto.randomBytes(32).toString('hex');
            tokenInstance.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
        }
    }
});

User.hasOne(EmailToken, { onDelete: 'CASCADE' });
EmailToken.belongsTo(User);

module.exports = EmailToken;
