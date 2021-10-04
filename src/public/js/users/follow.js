function follow() {
  $(".follow-button").onclick = async event => {
    const button = event.target;
    const userId = button.dataset.user;
    const { user } = await httpPut(`/api/users/${userId}/follow`);

    let followersLabel = $("#followersValue");

    if (user.following && user.following.includes(userId)) {
      button.innerText = "Following";
      button.classList.add("following");
      increaseNumber(followersLabel);
      return;
    }
    button.innerText = "Follow";
    button.classList.remove("following");
    decreaseNumber(followersLabel);
  };
}
document.addEventListener('DOMContentLoaded', () => {
  if (profileUserId != userLoggedIn._id) {
    follow();
  }
})