import { Router } from "express";
import { createFirstTimer, getAllFirstTimers } from "../controllers/firstTimerController.js";
import { validateFirstTimerInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.get("/", getAllFirstTimers)
router.post("/", validateFirstTimerInput, createFirstTimer)

export default router;
