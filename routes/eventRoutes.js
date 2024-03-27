import { Router } from 'express'
import { 
  createEvents, 
  getAllEvents, 
  getEvent,
  updateEvent, 
  deleteEvent 
} from '../controllers/eventscontrollers.js';

import upload from '../middleware/multerMiddleware.js';

import { 
  validateEventIdParam, 
  validateEventsInput 
} from '../middleware/validationMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getAllEvents)
  .post(upload.single('image'), createEvents);

router
  .route('/:id')
  .get(validateEventIdParam, getEvent)
  .patch(
    validateEventIdParam, 
    upload.single('image'), 
    validateEventsInput, 
    updateEvent
  )
  .delete(
    validateEventIdParam, deleteEvent
  );

export default router;
