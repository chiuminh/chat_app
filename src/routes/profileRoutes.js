import { Router } from "express";
const router = new Router();

import { requireLoggedIn } from "../app/middleware/auth";
import ProfileCtrl from "../app/controllers/ProfileCtrl";

router.get("/:username/replies", requireLoggedIn, ProfileCtrl.getReplies);
router.get("/:username/following", requireLoggedIn, ProfileCtrl.getFollowing);
router.get("/:username/followers", requireLoggedIn, ProfileCtrl.getFollowers);
router.get("/:username", requireLoggedIn, ProfileCtrl.getProfileByUsername);
router.get("/", requireLoggedIn, ProfileCtrl.getProfile);

export default router;
