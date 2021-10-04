const retweetPost = () => {
  $$(".retweet-button").forEach(button => {
    button.onclick = async e => {
      // GET postId
      const postId = getPostIdFromElement(button);
      if (!postId) {
        alertify.notify(
          "Xin lỗi bạn, hiện bài post này không còn tồn tại!",
          "error",
          6
        );
        return;
      }

      // Call API POST
      const { post } = await httpPost(`/api/posts/${postId}/retweet`);

      // console.log({ post });
      let parrentButton = button.parentElement;
      let numRetweetsEl = parrentButton.querySelector("span.number-retweets");
      let isRetweeted = post.retweetUsers.includes(userLoggedIn._id);

      if (isRetweeted) {
        parrentButton.classList.add("active");
        increaseNumber(numRetweetsEl);
        let html = createPostHtml(post);
        $(".post__container").insertAdjacentHTML("afterbegin", html);
        return;
      }
      parrentButton.classList.remove("active");
      decreaseNumber(numRetweetsEl);
    };
  });
};
