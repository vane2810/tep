// multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'contenidos',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

// Establecer un límite de tamaño en la carga de archivos (5 MB)
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = upload;