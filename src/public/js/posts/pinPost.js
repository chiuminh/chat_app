const handleSubmitPinPost = element => {
  $('#pinPostButton').onclick = async event => {
    const postId = element.getAttribute('data-id')
    let result = await httpPut(`/api/posts/${postId}`, {
      pinned: true,
    })
    window.location.reload()
  }
}

function pinPost() {
  $$('.button__open-modal--pin').forEach(button => {
    button.onclick = event => handleSubmitPinPost(event.target)
  })
}

// Unpin post
$('#unpinPostButton').onclick = async e => {
  const postId = $('.pin-button[data-bs-target="#unpinModal"]').getAttribute(
    'data-id'
  )
  let result = await httpPut(`/api/posts/${postId}`, {
    pinned: false,
  })

  window.location.reload()
}
