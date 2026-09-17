const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const Document = require('../models/Document');
const { uploadBlob, downloadBlob, deleteBlob } = require('./blobStorageService');

function computeChecksum(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function createDocument({ file, ownerId, uploadedBy, documentType }) {
    const documentId = uuidv4();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const blobName = `${ownerId}/${documentId}-${safeName}`;

    const checksum = computeChecksum(file.buffer);

    await uploadBlob(file.buffer, blobName, file.mimetype);

    const document = await Document.create({
        documentId,
        ownerId,
        uploadedBy,
        documentName: file.originalname,
        documentPath: blobName,
        documentType,
        mimeType: file.mimetype,
        fileSize: file.size,
        isEncrypted: false, // relying on Azure SSE only, per current setup
        checkSum: checksum,
        status: 'active',
    });

    return document;
}

async function getDocumentBuffer(documentId, requestingUser) {
    const document = await Document.findByPk(documentId);
    if (!document || document.status === 'deleted') {
        const err = new Error('Document not found');
        err.status = 404;
        throw err;
    }

    authorizeAccess(document, requestingUser);

    const buffer = await downloadBlob(document.documentPath);
    return { buffer, document };
}

async function listDocumentsForUser(requestingUser) {
    if (requestingUser.role === 'admin') {
        return Document.findAll({ where: { status: 'active' } });
    }
    // patients see their own; doctors/nurses would need an appointment-based
    // authorization check here rather than blanket access
    return Document.findAll({ where: { ownerId: requestingUser.id, status: 'active' } });
}

async function softDeleteDocument(documentId, requestingUser) {
    const document = await Document.findByPk(documentId);
    if (!document) {
        const err = new Error('Document not found');
        err.status = 404;
        throw err;
    }
    authorizeAccess(document, requestingUser);

    document.status = 'deleted';
    await document.save();
    await document.destroy(); // paranoid: true → sets deletedAt, doesn't hard-delete the row
}

function authorizeAccess(document, requestingUser) {
    const isOwner = document.ownerId === requestingUser.id;
    const isUploader = document.uploadedBy === requestingUser.id;
    const isAdmin = requestingUser.role === 'admin';

    if (!isOwner && !isUploader && !isAdmin) {
        const err = new Error('Not authorized to access this document');
        err.status = 403;
        throw err;
    }
}

module.exports = {
    createDocument,
    getDocumentBuffer,
    listDocumentsForUser,
    softDeleteDocument,
};