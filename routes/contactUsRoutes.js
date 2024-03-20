import { Router } from 'express'
import { createContactUsForm, getAllcontactUsForm } from '../controllers/contactUsController.js';
import { validateContactUsInput } from '../middleware/validationMiddleware.js';

const router = Router()

router.get('/', getAllcontactUsForm)
router.post('/', validateContactUsInput, createContactUsForm)

export default router;
