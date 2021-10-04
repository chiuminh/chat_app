let cropper;
$("#filePhoto").onchange = e => {
  let input = e.target;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = e => {
      // render image to element
      let image = $("#imagePreview");
      image.src = e.target.result;

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
    reader.readAsDataURL(input.files[0]);
  }
};

$("#submitImageUpload").onclick = e => {
  let canvas = cropper.getCroppedCanvas();

  if (canvas == null)
    return alertifyError(
      "Không thể upload avatar, bạn chắc chắn rằng đã tải ảnh lên."
    );

  canvas.toBlob(blob => {
    let formData = new FormData();
    formData.append("croppedImage", blob);
    console.log(formData);
  });
};
