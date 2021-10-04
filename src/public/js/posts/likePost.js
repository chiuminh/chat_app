function likePost() {
  $$(".like-button").forEach(button => {
    button.onclick = async e => {
      // Get PostId
      const postId = getPostIdFromElement(e.target);
      if (!postId) {
        alertify.notify(
          "Xin lỗi bạn, hiện bài post này không còn tồn tại!",
          "error",
          6
        );
        return;
      }
      // Call API
      const { post } = await httpPut(`/api/posts/${postId}/like`);

      let parentButton = button.parentElement;
      let numberLikesEl = parentButton.querySelector("span.number-likes");
      let isLiked = post.likes.includes(userLoggedIn._id);
      // Render
      if (isLiked) {
        parentButton.classList.add("active");
        increaseNumber(numberLikesEl);
        return;
      }

      parentButton.classList.remove("active");
      decreaseNumber(numberLikesEl);
    };
  });
}
