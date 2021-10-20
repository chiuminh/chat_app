document.addEventListener('DOMContentLoaded', () => {
  if (selectedTab == 'replies') {
    return loadReplies()
  }

  loadPosts()
})
