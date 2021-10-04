const loadPosts = async () => {
  const { posts } = await httpGet(`/api/posts?followingOnly=true`);
  if(posts.length == 0) return $(".post__container").insertAdjacentHTML(
    "afterbegin",
    '<span class="d-block text-center mt-3">Nothing to show</span>'
  );
  posts.forEach(post => outputPost(post, $(".post__container")));

  // activate like of current user
  likePost();

  // activate retweet of current user
  retweetPost();

  // get post when open reply modal
  getPostWhenOpenReplyModal();

  // Delete post
  deletePost();
};

document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});
