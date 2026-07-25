import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary-ს კონფიგურაცია
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// სთორიჯის გამართვა ფოლდერით
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], 
  },
});

// ფაილის ტიპის ფილტრი (მხოლოდ ფოტოები)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('ატვირთვა შესაძლებელია მხოლოდ ფოტო ფორმატის!'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // ლიმიტი: 2MB
});

export { cloudinary };