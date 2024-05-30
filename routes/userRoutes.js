import { Router } from 'express';
import { getCurrentUser, updateUser } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
// import { authorizePermissions } from '../middleware/authMiddleware.js';

const router = Router()

router.get('/current-user', getCurrentUser);
// router.get('/super-user/')
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;