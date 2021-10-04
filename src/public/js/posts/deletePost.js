const handleSubmitDeletePost = element => {
  $("#submitDeletePost").onclick = async event => {
    const postId = element.getAttribute("data-id");
    const { deletedPost } = await httpDelete(`/api/posts/${postId}`);

    if (deletedPost) {
      // remove element post
      $(".post__container")
        .querySelector(`div.post[data-id="${deletedPost._id}"]`)
        .remove();

      // close modal
      event.target.parentElement
        .querySelector("button.btn__cancel-delete--post")
        .click();
    }
  };
};

function deletePost() {
  $$(".button__open-modal--delete").forEach(button => {
    button.onclick = event => handleSubmitDeletePost(event.target);
  });
}
