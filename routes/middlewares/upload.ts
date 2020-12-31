/* External dependencies */
import path from 'path'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

export interface FieldType {
  [fieldname: string]: Express.Multer.File[]
}

const upload = multer({
  storage: multer.diskStorage({
    destination (_, __, cb) {
      cb(null, './images');
    },
    filename (_, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `ulrim_${Date.now()}_${uuidv4()}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
})

export default upload
