import { transErrors } from "../../../lang/vi";
import { Router } from "express";
import User from "../../app/models/User";
const router = new Router();

// [PUT] api/:userId/follow
router.put("/:userId/follow", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findUserNormalById({ _id: userId });
    if (!user)
      return res.status(404).json({ message: transErrors.user_not_found });

    let isFollowing = user.followers && user.followers.includes(req.user._id);
    let option = isFollowing ? "$pull" : "$addToSet";

    // Add user or remove user to following of current user
    req.user = await User.findByUserIdAndUpdate(req.user._id, {
      [option]: { following: userId },
    });

    // Add user or remove user to follwers of userId
    await User.findByUserIdAndUpdate(userId, {
      [option]: { followers: req.user._id },
    });

    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
});

// [GET] api/:userId/followers
router.get("/:userId/followers", async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await User.find({ _id: userId })
      .populate("followers")
      .select("-local.password");
    if (!users)
      return res.status(404).json({ message: transErrors.user_not_found });

    return res.status(200).json({ user: users[0] });
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
});

// [GET] api/:userId/following
router.get("/:userId/following", async (req, res) => {
  const { userId } = req.params;
  try {
    let users = await User.find({ _id: userId })
      .populate("following")
      .select("-local.password");
    if (!users)
      return res.status(404).json({ message: transErrors.user_not_found });

    return res.status(200).json({ user: users[0] });
  } catch (error) {
    console.log({ error });
    res.status(404).json({ message: error.message });
  }
});

export default router;
