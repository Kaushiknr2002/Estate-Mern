import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import userRouter from './route/user.route.js';
import authRouter from './route/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());  // Allow frontend to access backend
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads/', // Store files in 'uploads' folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// API route to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.json({ success: true, fileUrl: `/uploads/${req.file.filename}` });
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
