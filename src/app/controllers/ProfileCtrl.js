import ProfileService from "../services/ProfileService";

class ProfileCtrl {

  // [GET] /profile
  async getProfile(req, res, next) {
    let payload = await ProfileService.getPayLoad(req.user.username, req.user);
    return res.status(200).render("main/profile_page", payload);
  }

  // [GET] /profile/:username
  async getProfileByUsername(req, res, next) {
    let payload = await ProfileService.getPayLoad(
      req.params.username,
      req.user
    );
    return res.status(200).render("main/profile_page", payload);
  }

  // [GET] /profile/:username/replies
  async getReplies(req, res, next) {
    let payload = await ProfileService.getPayLoad(
      req.params.username,
      req.user
    );
    payload["selectedTab"] = "replies";

    return res.status(200).render("main/profile_page", payload);
  }

  // [GET] /profile/:username/following
  async getFollowing(req, res, next) {
    let payload = await ProfileService.getPayLoad(
      req.params.username,
      req.user
    );
    payload["selectedTab"] = "following";

    return res.status(200).render("main/followers_and_follwing", payload);
  }

  // [GET] /profile/:username/followers
  async getFollowers(req, res, next) {
    let payload = await ProfileService.getPayLoad(
      req.params.username,
      req.user
    );
    payload["selectedTab"] = "followers";

    return res.status(200).render("main/followers_and_follwing", payload);
  }
}

export default new ProfileCtrl();
