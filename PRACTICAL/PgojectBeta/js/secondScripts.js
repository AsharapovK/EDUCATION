// Функция для форматирования даты
function formatDate(dateString) {
  let date = new Date(dateString);

  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Функция для форматирования числа
function formatNumberWithSpaces(number) {
  // Преобразуем число в строку и удаляем дробную часть
  let numStr = Math.floor(number).toString();
  // Используем регулярное выражение для добавления пробелов
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function followingLink(ActiveLink) {
  var ActiveHideMenu = document.querySelector(".ActiveHideMenu");

  if (ActiveHideMenu) {
    window.location.href = ActiveLink + "?hideMenu=true";
  } else {
    window.location.href = ActiveLink;
  }
}
