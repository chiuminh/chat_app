const handelSubmitReplyButton = element => {
  if (!element.target.value.trim()) {
    $("#submitReplyButton").disabled = true;
    return;
  }
  $("#submitReplyButton").disabled = false;
};

const handleCloseReplyModal = () => {
  $("#replyModal").onclick = event => {
    const target = event.target;
    if (target.classList.contains("close-reply-modal")) {
      $("#originalPostContainer").innerHTML = "";
    }
  };
};

// get post when open reply modal
const getPostWhenOpenReplyModal = () => {
  $$('button[data-bs-target="#replyModal"]').forEach(button => {
    button.onclick = async () => {
      let postId = getPostIdFromElement(button);
      let { post } = await httpGet("/api/posts/" + postId);
      outputPost(post, $("#originalPostContainer"));
      handleCloseReplyModal();
    };
  });
};

document.addEventListener("DOMContentLoaded", () => {
  $("#replyTextarea").onkeyup = async element => {
    handelSubmitReplyButton(element);
    element.which === 13 && createPost(element);
  };

  $("#submitReplyButton").onclick = createPost;
});
