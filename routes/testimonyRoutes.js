import { Router } from 'express';
import {
  createTestimonyForm,
  getAllTestimonyForm,
  getTestimonyForm,
  deleteTestimonyForm,
  updateTestimonyForm
} from '../controllers/testimonyFormController.js';
import { validateTestimonyInput, validateIdParam } from '../middleware/validationMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/', getAllTestimonyForm)
router.post(
  '/',
  upload.single('avatar'),
  validateTestimonyInput,
  createTestimonyForm
  )
  router.get('/:id', validateIdParam, getTestimonyForm)
  router.delete('/:id', validateIdParam, deleteTestimonyForm)
  router.patch('/:id', validateIdParam, updateTestimonyForm)

export default router;
