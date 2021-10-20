let submitSearchUser = async input => {
  if (!input.value) {
    return window.location.reload()
  }
  let result = await httpGet(`api/users?keyword=${input.value}`)
  console.log(result)
}

$('#searchUser').onkeypress = e => {
  if (e.keyCode === 13) {
    submitSearchUser(e.target)
  }
}
$('#searchButton').onclick = e => submitSearchUser($('#searchUser'))
