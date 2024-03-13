import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads');
//   }
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// })

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  // console.log('file:', file)
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
