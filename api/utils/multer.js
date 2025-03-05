import multer from 'multer';

const storage = multer.diskStorage({
    destination: './uploads', // Folder to store images
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage });
  