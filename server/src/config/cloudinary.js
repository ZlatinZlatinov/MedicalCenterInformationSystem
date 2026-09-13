const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadBufferToCloudinary(buffer, options = {}) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: options.folder || 'doctors',
                resource_type: 'image',
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url);
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });
}

module.exports = {
    cloudinary,
    uploadBufferToCloudinary,
};
