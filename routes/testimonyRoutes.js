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

router
  .route('/')
  .get(getAllTestimonyForm)
  .post(
    upload.single('avatar'),
    validateTestimonyInput,
    createTestimonyForm
  )

  router
    .route('/:id')
    .get(validateIdParam, getTestimonyForm)
    .patch(upload.single('avatar'), validateIdParam, updateTestimonyForm)
    .delete(validateIdParam, deleteTestimonyForm)

  // router.patch('/update-user', upload.single('avatar'), validateIdParam, updateTestimonyForm)

export default router;
