const handelBtnSubmitPost = element => {
  if (!element.target.value.trim()) {
    $('#submitPostButton').disabled = true
    return
  }
  $('#submitPostButton').disabled = false
}

const createPost = async e => {
  const value = $('#postTextarea').value.trim()
  let isModal =
    e.target.getAttribute('id') === 'submitReplyButton' ||
    e.target.getAttribute('id') === 'replyTextarea'
  let data = {
    content: value,
  }
  if (isModal) {
    let replyTo = $('#replyModal div.post').dataset.id // getAttribute("data-id")
    let content = $('#replyTextarea').value.trim()
    Object.assign(data, {
      replyTo,
      content,
    })
  }
  // Call API to server
  const { post } = await httpPost('/api/posts', data)
  if (post.replyTo) {
    location.reload()
    return
  }
  // createPostHtml: [helpers/post.js]
  outputPost(post, $('.post__container'))
  clearInput($('#postTextarea'))
  $('#submitPostButton').disabled = true

  // Xử lý realtime
}

document.addEventListener('DOMContentLoaded', () => {
  $('#postTextarea').onkeyup = element => {
    handelBtnSubmitPost(element)
    element.which === 13 && createPost(element)
  }
  $('#submitPostButton').onclick = createPost
})
