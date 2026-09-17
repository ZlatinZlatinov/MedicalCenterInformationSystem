const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Document = sequelize.define('Document', {
    documentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    uploadedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    documentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentPath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documentType: {
        type: DataTypes.ENUM('discharge_summary', 'lab_result', 'imaging_result', 'prescription', 'referral', 'other'),
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
    },
    fileSize: {
        type: DataTypes.INTEGER,
    },
    isEncrypted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    encryptionKeyId: {
        type: DataTypes.STRING
    },
    encryptionIV: {
        type: DataTypes.STRING
    },
    checkSum: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'archived', 'deleted'),
        defaultValue: 'active'
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
    tableName: 'documents',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
});

module.exports = Document;