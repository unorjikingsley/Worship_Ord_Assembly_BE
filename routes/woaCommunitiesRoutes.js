import { Router } from 'express'
import {
  createWOACommunities,
  getACommunity,
  getAllCommunity,
  updateCommunity,
  deletedWoaCommunities,
} from '../controllers/woaCommunitiesController.js'

import {
  validateWOACommunityInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'

const router = Router()

router.route('/').get(getAllCommunity).post(createWOACommunities)

router
  .route('/:id')
  .get(validateIdParam, getACommunity)
  .patch(validateIdParam, validateWOACommunityInput, updateCommunity)
  .delete(validateIdParam, deletedWoaCommunities)

export default router;
