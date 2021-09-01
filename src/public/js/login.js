const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
$$(".alert i").forEach(item => {
  item.onclick = e => {
    e.target.parentNode.remove();
  };
});
