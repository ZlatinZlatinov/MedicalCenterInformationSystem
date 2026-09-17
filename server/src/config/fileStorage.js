const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { uploadBufferToCloudinary } = require('./cloudinary');

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
    'image/jpeg', 
    'image/png',
];
const isProduction = process.env.NODE_ENV === 'production';
const uploadsDir = path.join(process.cwd(), 'uploads');

if (!isProduction) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

function fileFilter(req, file, cb) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(new Error('Only JPEG and PNG images are allowed.'));
    }
    cb(null, true);
}

const upload = multer({
    storage: isProduction ? multer.memoryStorage() : diskStorage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
});

async function resolveProfilePictureUrl(file) {
    if (isProduction) {
        return uploadBufferToCloudinary(file.buffer);
    }

    return `${process.env.SERVER_URL}/uploads/${file.filename}`;
} 

const DOCUMENT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB, docs/scans run bigger than avatars
const DOCUMENT_ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'image/png',
    'image/jpeg',
];

function documentFileFilter(req, file, cb) {
    if (!DOCUMENT_ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(new Error('Only PDF, DOCX, PNG and JPEG files are allowed.'));
    }
    cb(null, true);
}

// Always memoryStorage, regardless of NODE_ENV — documents never touch
// local disk, they go straight to Azure Blob in every environment.
const uploadDocument = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: DOCUMENT_MAX_FILE_SIZE },
    fileFilter: documentFileFilter,
});

// ---- Shared error handler (works for both uploaders) ----

function handleMulterError(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File exceeds the maximum allowed size.' });
        }
        return res.status(400).json({ message: err.message });
    }

    if (err) {
        return res.status(400).json({ message: err.message });
    }

    next();
}

module.exports = {
    upload,
    handleMulterError,
    resolveProfilePictureUrl,
    MAX_FILE_SIZE,
    uploadDocument
};
