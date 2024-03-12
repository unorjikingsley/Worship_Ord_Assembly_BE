import { Router } from 'express'
import {
  createPrayerForm,
  getAllPrayerForm,
} from '../controllers/prayerFormController.js'
import { validatePrayerInput } from '../middleware/validationMiddleware.js'

const router = Router()

router.get('/', getAllPrayerForm)
router.post('/', validatePrayerInput, createPrayerForm)

export default router
