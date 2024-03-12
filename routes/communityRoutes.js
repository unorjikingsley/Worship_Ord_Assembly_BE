import { Router } from "express";
import { createCommunity, getAllCommunity } from "../controllers/communityController.js";
import { validateCommunityInput } from "../middleware/validationMiddleware.js";

const router = Router()

router.get("/", getAllCommunity)
router.post('/', validateCommunityInput, createCommunity);

export default router;