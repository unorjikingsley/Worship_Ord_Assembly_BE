import { Router } from 'express';
import {
  createTestimonyForm,
  getAllTestimonyForm,
} from '../controllers/testimonyFormController.js';
import { validateTestimonyInput } from '../middleware/validationMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/', getAllTestimonyForm)
// router.post('/', validateTestimonyInput, createTestimonyForm)
router.post(
  '/',
  upload.single('avatar'),
  validateTestimonyInput,
  createTestimonyForm
)

export default router;
