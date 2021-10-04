function outputUsers(users, container) {
  if (users.length == 0) return container.insertAdjacentHTML("afterbegin",'<span class="d-block text-center mt-3">Nothing to show</span>');
  users.forEach(user => {
    const html = createUserHtml(user, true)
    container.insertAdjacentHTML("afterbegin", html);
  })

}

function createUserHtml(user, showFollowButton) {
  let name = `${user.firstname} ${user.lastname}`;
  let isFollowing = userLoggedIn.following && userLoggedIn.following.includes(user._id)
  var text = isFollowing ? "Following" : "Folllow"
  var buttonClass = isFollowing ? "follow-button following" : "follow-button"

  let followButton = ""
  if(showFollowButton && userLoggedIn._id != user._id) {
    followButton = `
      <div class="follow__button-container">
        <button class="${buttonClass}" data-user="${user._id}">${text}</button>
      </div>
    `
  }

  return `
      <div class="user">
        <div class="user__image-container">
          <img src="/assets/images/users/${user.profilePic}" alt="" />
        </div>
        <div class="user__details-container">
          <a href="/profile/${user.username}">${name}</a>
          <span class="username">@${user.username}</span>
        </div>
        ${followButton}
      </div>
  `
}

