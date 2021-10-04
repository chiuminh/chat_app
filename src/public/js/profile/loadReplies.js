const loadReplies = async () => {
  const { posts } = await httpGet(
    `/api/posts?postedBy=${profileUserId}&isReply=true`
  );
  if (posts.length > 0)
    posts.forEach(post => outputPost(post, $(".post__container")));
  else
    $(".post__container").insertAdjacentHTML(
      "afterbegin",
      '<span class="d-block text-center mt-3">Nothing to show</span>'
    );
};
