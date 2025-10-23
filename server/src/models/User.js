const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, 
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'doctor', 'nurse'),
        allowNull: false,
        defaultValue: 'user',
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    provider: {
        type: DataTypes.ENUM('local', 'google'),
        allowNull: false,
        defaultValue: 'local',
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password') && user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    },
});

User.prototype.validatePassword = async function (password) {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
};

User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
};

module.exports = User;