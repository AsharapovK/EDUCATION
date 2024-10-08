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

function clearBtn() {
  // Очищаем первое поле ввода
  document.getElementById("bxUrlLink").value = "";
  document.getElementById("bxUrlLink").placeholder = "";

  document.getElementById("bxUrlLink2").value = "";
  document.getElementById("bxUrlLink2").placeholder = "";

  // Сбрасываем текст и ссылку в элементе <a>
  let linkElement = document.querySelector(
    ".setting__content__link__text__link"
  );
  linkElement.href = "#";
  linkElement.textContent = "https://";

  let count = calcCount();
  let date = formatDate(new Date());
  let notification__clear = `<div class="setting__content__control__clear">
                            <div class="setting__content__control__notofocation">
                                <div class="setting__content__control__notofocation__header">
                                    <p id="notification_name">Settings are cleared</p>
                                    <p>Notification #${count + 1}</p>
                                </div>
                                <div class="setting__content__control__notofocation__body">
                                    <p>Due date:</p>
                                    <p id="notification_date">${date}</p>
                                </div>
                                <div class="setting__content__control__notofocation__footer">
                                    <div>
                                        <img src="../img/profile_photo.jpg" alt="">
                                        <p id="notification_creator">Julia Komleva</p>
                                    </div>
                                    <p id="notification_status">Cleared</p>
                                </div>
                            </div>
                        </div>`;

  console.log(`Количество div: ${count}`);

  let notification_div = document.querySelector(
    ".insertNotification"
  ).innerHTML;

  notification_div = notification__clear + notification_div;

  document.querySelector(".insertNotification").innerHTML = notification_div;
}

async function getBxData() {
  let date = formatDate(new Date());
  let count = calcCount();

  let bxUrlLink2 = document.getElementById("bxUrlLink2").value;

  if (bxUrlLink2 === "") {
    // count = calcCount();
    let notification__error = `<div class="setting__content__control__error">
    <div class="setting__content__control__notofocation">
        <div class="setting__content__control__notofocation__header">
            <p id="notification_name">Error: incorrect link</p>
            <p>Notification #${count + 1}</p>
        </div>
        <div class="setting__content__control__notofocation__body">
            <p>Due date:</p>
            <p id="notification_date">${date}</p>
        </div>
        <div class="setting__content__control__notofocation__footer">
            <div>
                <img src="../img/profile_photo.jpg" alt="">
                <p id="notification_creator">Julia Komleva</p>
            </div>
            <p id="notification_status">Error</p>
        </div>
    </div>
  </div>`;

    //Вставляем данные в блок
    let notification_div = document.querySelector(
      ".insertNotification"
    ).innerHTML;
    notification_div = notification__error + notification_div;
    document.querySelector(".insertNotification").innerHTML = notification_div;
  } else {
    // count = calcCount();
    let notification__request = `<div class="setting__content__control__request">
    <div class="setting__content__control__notofocation">
        <div class="setting__content__control__notofocation__header">
            <p id="notification_name">Request data</p>
            <p>Notification #${count + 1}</p>
        </div>
        <div class="setting__content__control__notofocation__body">
            <p>Due date:</p>
            <p id="notification_date">${date}</p>
        </div>
        <div class="setting__content__control__notofocation__footer">
            <div>
                <img src="../img/profile_photo.jpg" alt="">
                <p id="notification_creator">Julia Komleva</p>
            </div>
            <p id="notification_status">Request</p>
        </div>
    </div>
  </div>`;

    //Вставляем данные в блок
    let notification_div = document.querySelector(
      ".insertNotification"
    ).innerHTML;
    notification_div = notification__request + notification_div;
    document.querySelector(".insertNotification").innerHTML = notification_div;
    await delay(1500); // Задержка перед добавлением нового элемента

    count = calcCount();
    let notification__complete = `<div class="setting__content__control__complete">
     <div class="setting__content__control__notofocation">
         <div class="setting__content__control__notofocation__header">
             <p id="notification_name">Data successfully received</p>
             <p>Notification #${count + 1}</p>
         </div>
         <div class="setting__content__control__notofocation__body">
             <p>Due date:</p>
             <p id="notification_date">${date}</p>
         </div>
         <div class="setting__content__control__notofocation__footer">
             <div>
                 <img src="../img/profile_photo.jpg" alt="">
                 <p id="notification_creator">Julia Komleva</p>
             </div>
             <p id="notification_status">Complete</p>
         </div>
     </div>
     </div>`;

    notification_div = document.querySelector(".insertNotification").innerHTML;
    notification_div = notification__complete + notification_div;
    document.querySelector(".insertNotification").innerHTML = notification_div;

    var bitrix24URL = document.getElementById("bxUrlLink2").value;
    // Парсим и сохраняем строку в сессионной переменной
    const myObjectString = JSON.stringify(bitrix24URL);
    sessionStorage.setItem("mySessionbitrix24URL", myObjectString);
  }
}

function calcCount() {
  const countComplete = document.querySelectorAll(
    ".setting__content__control__complete"
  ).length;

  const countrequest = document.querySelectorAll(
    ".setting__content__control__request"
  ).length;

  const countClear = document.querySelectorAll(
    ".setting__content__control__clear"
  ).length;

  const countError = document.querySelectorAll(
    ".setting__content__control__error"
  ).length;

  let count = countComplete + countrequest + countClear + countError;
  return count;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
