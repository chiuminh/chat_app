let submitSearch = async (search, searchType) => {
  let url = searchType === 'users' ? '/api/users' : '/api/posts'
  let response = await httpGet(
    `${url}?search=${search}&searchType=${searchType}`
  )
  let resultType = response?.users || response?.posts
  if (resultType) {
    if (!resultType.length) {
      $(
        '.results-container'
      ).innerHTML = `<span class="text-center py-4">Không tìm thấy ${
        searchType == 'users' ? 'user có tên' : 'bài viết'
      } "<b>${search}</b>"</span>`
      return
    }
  }

  // Response result users
  if (searchType === 'users') {
    let html = response.users
      .map(user => {
        return createUserHtml(user, true)
      })
      .join('')
    $('.results-container').innerHTML = html
    return
  }

  // Response result posts
  let html = response.posts
    .map(post => {
      return createPostHtml(post)
    })
    .join('')
  $('.results-container').innerHTML = html
}

let timer
$('#searchInput').oninput = e => {
  clearTimeout(timer)
  let textBox = e.target
  let value = textBox.value
  let searchType = textBox.dataset.search
  timer = setTimeout(() => {
    value = textBox.value.trim()
    submitSearch(value, searchType)
    // if (value == '') {
    //   $('.results-container').innerHTML = ''
    // } else {
    //   submitSearch(value, searchType)
    // }
  }, 800)
}
$('#searchButton').onclick = e =>
  submitSearch($('#searchInput').value, $('#searchInput').dataset.search)
