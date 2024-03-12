import { Router } from 'express'
import {
  createTestimonyForm,
  getAllTestimonyForm,
} from '../controllers/testimonyFormController.js'
import { validateTestimonyInput } from '../middleware/validationMiddleware.js'

const router = Router()

router.get('/', getAllTestimonyForm)
router.post('/', validateTestimonyInput, createTestimonyForm)

export default router
