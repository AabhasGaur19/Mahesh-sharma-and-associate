// src/api/uploadApi.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure Uploads folder exists
const uploadPath = path.join(__dirname, '../../Uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Saving file to: ${uploadPath}`); // Debug log
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log(`Generated filename: ${filename}`); // Debug log
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/html') {
      cb(null, true);
    } else {
      cb(new Error('Only HTML files are allowed'), false);
    }
  }
});

const uploadFile = upload.single('file');

module.exports = { uploadFile };
