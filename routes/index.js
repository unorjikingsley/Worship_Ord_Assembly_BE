import { Router } from 'express'
import CommunityRoutes from "./communityRoutes.js";
import FirstTimerRoutes from "./firstTimerRoutes.js";
import PrayerRoutes from "./prayerRoutes.js";
import TestimonyRoutes from "./testimonyRoutes.js";
import MessageRoutes from "./messageRoutes.js";
import WOACommunities from "./woaCommunitiesRoutes.js";
import contactUsRoutes from "./contactUsRoutes.js";

const router = Router()

router.use('/api/community', CommunityRoutes)
router.use('/api/first-timer', FirstTimerRoutes)
router.use('/api/prayer-form', PrayerRoutes)
router.use('/api/testimony-form', TestimonyRoutes)
router.use('/api/message', MessageRoutes)
router.use('/api/woa-communities', WOACommunities)
router.use('/api/contact-form', contactUsRoutes)

export default router;
