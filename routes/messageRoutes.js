import { Router } from 'express';
import {
  createMessage,
  getAllMessages,
  getMessage,
  updateMessage,
  deleteMessage
} from '../controllers/messageControllers.js';
import upload from '../middleware/multerMiddleware.js';

import {
  validateIdParam,
  validateMessageInput
} from '../middleware/validationMiddleware.js'

const router = Router()

router
  .route('/')
  .get(getAllMessages)
  .post(upload.single('image'), createMessage)

router
  .route('/:id')
  .get(validateIdParam, getMessage)
  .patch(
    validateIdParam,
    upload.single('image'),
    validateMessageInput,
    updateMessage
  )
  .delete(validateIdParam, deleteMessage)

export default router
