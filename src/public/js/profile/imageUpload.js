let cropper

// Check file when upload
let checkFileUpload = fileData => {
  let types = ['image/ipg', 'image/png', 'image/jpeg']
  let limit = 1048576 //byte = 1MB

  if (!types.includes(fileData.type)) {
    alertifyError('Kiểu file không hợp lệ, chỉ chấp nhận ảnh png, jpg và jpeg')
    return false
  }

  if (fileData.size > limit) {
    alertifyError(`Ảnh upload tối đa cho phép là ${limit}`)
    return false
  }

  return true
}

const previewImage = (input, selector, namePreview, optionsCopper) => {
  if (input.files && input.files[0]) {
    let reader = new FileReader()
    if (!checkFileUpload(input.files[0])) return (input.value = '')
    reader.onload = e => {
      // render image to element
      let imagePreviewContainer = $(selector)
      imagePreviewContainer.innerHTML = ''

      let image = document.createElement('img')
      image.setAttribute('id', namePreview)
      image.src = e.target.result
      imagePreviewContainer.appendChild(image)
      // cropper image
      if (cropper !== undefined) {
        cropper.destroy()
      }

      cropper = new Cropper(image, optionsCopper)

      // prevent event zoom
      image.addEventListener('zoom', event => {
        event.preventDefault()
      })
    }

    // preview
    reader.readAsDataURL(input.files[0])
  }
}
const submitImage = (keyImage, api) => {
  let canvas = cropper.getCroppedCanvas()
  if (canvas == null) {
    alertifyError(
      'Không thể upload avatar, bạn chưa tải file hoặc kiểu file của bạn không hợp lệ.'
    )
    return (input.value = '')
  }
  canvas.toBlob(async blob => {
    // Send fileData to server
    let formData = new FormData()
    formData.append(keyImage, blob)

    const response = await fetch(api, {
      method: 'PATCH',
      body: formData,
    })
    const res = await response.json()
    if (!response.ok) {
      alertifyError(res.message)
      // remove cropper
      cropper.destroy()
    }
    // clear element
    return location.reload()
  })
}

// Preview image and cropper
$('#filePhoto').onchange = e =>
  previewImage(e.target, '.image-preview__container', 'imagePreview', {
    aspectRadio: 1 / 1,
    background: false,
  })

// Preview cover and cropper
$('#coverPhoto').onchange = e =>
  previewImage(e.target, '.cover-preview__container', 'coverPreview', {
    aspectRatio: 16 / 9,
    background: false,
  })

// submit image file data to server
$('#submitImageUpload').onclick = e =>
  submitImage('croppedImage', '/api/users/profilePicture')

// submit cover photo file data to server
$('#submitCoverPhoto').onclick = e =>
  submitImage('coppedCoverPhoto', '/api/users/coverPhoto')
