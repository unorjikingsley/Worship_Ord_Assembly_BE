import { Router } from 'express'
import CommunityRoutes from "./communityRoutes.js";
import FirstTimerRoutes from "./firstTimerRoutes.js";
import PrayerRoutes from "./prayerRoutes.js";
import TestimonyRoutes from "./testimonyRoutes.js";


const router = Router()

router.use('/api/community', CommunityRoutes)
router.use('/api/first-timer', FirstTimerRoutes)
router.use('/api/prayer-form', PrayerRoutes)
router.use('/api/testimony-form', TestimonyRoutes)

export default router;
