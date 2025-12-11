const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  //this will keep original filename + timestamp
    }
});

const upload = multer({ storage }); 

module.exports = {
    upload
}