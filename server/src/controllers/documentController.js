const { uploadDocument } = require('../config/fileStorage');
const documentService = require('../services/documentsService');
const { errorParser } = require('../utils/errorParser');

const documentController = require('express').Router();

documentController.post('/', uploadDocument.single('file'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { documentType, ownerId } = req.body;
        if (!documentType) {
            return res.status(400).json({ message: 'documentType is required' });
        }

        // Patients upload for themselves; doctors/admins may specify ownerId
        const resolvedOwnerId = ownerId || req.user.id;

        const document = await documentService.createDocument({
            file: req.file,
            ownerId: resolvedOwnerId,
            uploadedBy: req.user.id,
            documentType,
        });

        res.status(201).json({
            documentId: document.documentId,
            documentName: document.documentName,
            documentType: document.documentType,
            createdAt: document.createdAt,
        });
    } catch (err) {
        const message = errorParser(err);
        res.status(500).json({message});
    }
});

documentController.get('/', async (req, res, next) => {
    try {
        const documents = await documentService.listDocumentsForUser(req.user);
        res.json(documents);
    } catch (err) {
        const message = errorParser(err);
        res.status(500).json({message});
    }
});

documentController.get('/:documentId/download', async (req, res, next) => {
    try {
        const { documentId } = req.params;
        const { buffer, document } = await documentService.getDocumentBuffer(documentId, req.user);

        res.setHeader('Content-Type', document.mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${document.documentName}"`);
        res.send(buffer);
    } catch (err) {
        const message = errorParser(err);
        res.status(500).json({message});
    }
});

documentController.delete('documentId', async (req, res, next) => {
    try {
        const { documentId } = req.params;
        await documentService.softDeleteDocument(documentId, req.user);
        res.status(204).send();
    } catch (err) {
        const message = errorParser(err);
        res.status(500).json({message});
    }
});

module.exports = { documentController };