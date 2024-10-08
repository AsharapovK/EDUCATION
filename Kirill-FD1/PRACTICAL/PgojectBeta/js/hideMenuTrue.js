const urlParams = new URLSearchParams(window.location.search);
const shouldActivateMenu = urlParams.get("hideMenu");

// Проверяем наличие параметра и активируем класс
if (shouldActivateMenu === "true") {
  document.body.classList.add("ActiveHideMenu");
}
