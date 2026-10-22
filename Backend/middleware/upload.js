const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productImagesDir = path.join(__dirname, '..', 'uploads', 'productImages');
if (!fs.existsSync(productImagesDir)) {
  fs.mkdirSync(productImagesDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productImagesDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isAllowed = allowedTypes.test(file.mimetype);
  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, WEBP images are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
