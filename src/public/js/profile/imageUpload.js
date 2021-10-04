let cropper;
// Preview image and cropper
$("#filePhoto").onchange = e => {
  let input = e.target;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    if (!checkFileUpload(input.files[0])) return (input.value = "");
    reader.onload = e => {
      // render image to element
      let imagePreviewContainer = $(".image-preview__container ");
      imagePreviewContainer.innerHTML = "";

      let image = document.createElement("img");
      image.setAttribute("id", "imagePreview");
      image.src = e.target.result;
      imagePreviewContainer.appendChild(image);
      // cropper image
      if (cropper !== undefined) {
        cropper.destroy();
      }

      cropper = new Cropper(image, {
        aspectRadio: 1 / 1,
        background: false,
      });

      // prevent event zoom
      image.addEventListener("zoom", event => {
        event.preventDefault();
      });
    };

    // preview
    reader.readAsDataURL(input.files[0]);
  }
};

// submit image file data to server
$("#submitImageUpload").onclick = e => {
  let canvas = cropper.getCroppedCanvas();
  if (canvas == null) {
    alertifyError(
      "Không thể upload avatar, bạn chưa tải file hoặc kiểu file của bạn không hợp lệ."
    );
    return (input.value = "");
  }
  canvas.toBlob(async blob => {
    // Send fileData to server
    let formData = new FormData();
    formData.append("croppedImage", blob);

    const response = await fetch("/api/users/profilePicture", {
      method: "PUT",
      body: formData,
    });
    const res = await response.json();
    if (!response.ok) {
      alertifyError(res.message);
      // remove cropper
      cropper.destroy();
    }
    // clear element
    return location.reload();
  });
};

// Check file when upload
function checkFileUpload(fileData) {
  let types = ["image/ipg", "image/png", "image/jpeg"];
  let limit = 1048576; //byte = 1MB

  if (!types.includes(fileData.type)) {
    alertifyError("Kiểu file không hợp lệ, chỉ chấp nhận ảnh png, jpg và jpeg");
    return false;
  }

  if (fileData.size > limit) {
    alertifyError(`Ảnh upload tối đa cho phép là ${limit}`);
    return false;
  }

  return true;
}
