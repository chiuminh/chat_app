/**
 * Alert notify Success
 * @param {string} message
 */
function alertifySuccess(message) {
  alertify.notify(message, "success", 6);
}
/**
 * Alert notify error
 * @param {string} message
 */
function alertifyError(message) {
  alertify.notify(message, "error", 6);
}

/**
 * Increase number at selector
 * @param {string} selector
 */
function increaseNumber(selector) {
  let number = +selector.textContent + 1;
  selector.innerHTML = number;
}

/**
 * Decrease number at selector
 * @param {string} selector of css
 */
function decreaseNumber(selector) {
  let number = +selector.textContent - 1;
  selector.innerHTML = number ? number : "";
}

/**
 * Convert a Date into a Human-Readable
 * @param {data} current date
 * @param {date} previous date
 * @returns time + string
 */
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
  }
  if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " phút trước";
  }
  if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " giờ trước";
  }
  if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " ngày trước";
  }
  if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " tháng trước";
  }
  return Math.round(elapsed / msPerYear) + " năm trước";
}
