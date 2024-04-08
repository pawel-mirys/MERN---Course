import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}--${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (
  file: Express.Multer.File,
  cb: (error: Error | null, isValid: boolean) => void
) => {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);
  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Images Only'), false);
  }
};

const upload = multer({
  storage,
});

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded!',
    image: `/${req.file?.path}`,
  });
});

export default router;
