import { Router } from 'express';
import { getCurrentUser, updateUser } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
// import { authorizePermissions } from '../middleware/authMiddleware.js';

const router = Router()

router.get('/current-user/:id', getCurrentUser);
// router.get('/super-user/')
router.patch('/update-user/:id', validateUpdateUserInput, updateUser);

export default router;