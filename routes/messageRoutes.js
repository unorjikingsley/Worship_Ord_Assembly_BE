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
  validateMessageIdParam,
  validateMessageInput
} from '../middleware/validationMiddleware.js'

const router = Router()

router
  .route('/')
  .get(getAllMessages)
  .post(upload.single('image'), createMessage)

router
  .route('/:id')
  .get(validateMessageIdParam, getMessage)
  .patch(
    validateMessageIdParam,
    upload.single('image'),
    validateMessageInput,
    updateMessage
  )
  .delete(validateMessageIdParam, deleteMessage)

export default router
