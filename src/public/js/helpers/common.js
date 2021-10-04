function alertifyError(message) {
  alertify.notify(message, "error", 6);
}
function increaseNumber(selector) {
  let number = +selector.textContent + 1;
  selector.innerHTML = number;
}

function decreaseNumber(selector) {
  let number = +selector.textContent - 1;
  selector.innerHTML = number ? number : "";
}

function timeDifference(current, previous) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;
  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Vừa xong";
    return Math.round(elapsed / 1000) + " giây trước";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " phút trước";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " giờ trước";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " ngày trước";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " tháng trước";
  } else {
    return Math.round(elapsed / msPerYear) + " năm trước";
  }
}
