const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"))
    }
})

// File filter to allow only specific file types (e.g., images and PDFs)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    if(extname){
        cb(null, true);
    }else{
        cb(new Error('Only images and PDFs are allowed'));
    }
}

const upload = multer({storage, fileFilter})

module.exports = upload;