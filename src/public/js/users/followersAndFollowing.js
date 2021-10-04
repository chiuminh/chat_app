const loadFollowers = async () => {
  const { user } = await httpGet(`/api/users/${profileUserId}/followers`);
  outputUsers(user.followers, $(".results-container"))
  follow();
};

const loadFollowing = async () => {
  const { user } = await httpGet(`/api/users/${profileUserId}/following`);
  outputUsers(user.following, $(".results-container"))
  follow();
};

document.addEventListener("DOMContentLoaded", () => {
  if (selectedTab == "followers") return loadFollowers();
  loadFollowing();
});
