const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SIGNIN_KEY: process.env.JWT_SIGNIN_KEY,
    PORT: process.env.PORT || 5000,
    MAIL_ID: process.env.MAIL_ID,
    MAIL_PASS: process.env.MAIL_PASS,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}

