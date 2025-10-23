const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const crypto = require('crypto');
const User = require('./User');

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
        allowNull: false,
        defaultValue: () => {
            return crypto.randomBytes(32).toString('hex');
        }
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => {
            return new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
        }
    }
}, {
    tableName: 'emailtoken',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
});

User.hasOne(EmailToken, { onDelete: 'CASCADE' });
EmailToken.belongsTo(User);

module.exports = EmailToken;
