const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { uploadBufferToCloudinary } = require('./cloudinary');

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
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

function handleMulterError(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'Image must be 5MB or smaller.' });
        }
        return res.status(400).json({ message: err.message });
    }

    if (err) {
        return res.status(400).json({ message: err.message });
    }

    next();
}

async function resolveProfilePictureUrl(file) {
    if (isProduction) {
        return uploadBufferToCloudinary(file.buffer);
    }

    return `${process.env.SERVER_URL}/uploads/${file.filename}`;
}

module.exports = {
    upload,
    handleMulterError,
    resolveProfilePictureUrl,
    MAX_FILE_SIZE,
};
