// script.js
// Функция для проверки ширины окна и добавления/удаления класса
function checkWidth() {
    if (window.innerWidth <= 1200) {
      document.body.classList.add('ActiveHideMenu');
    } else {
      document.body.classList.remove('ActiveHideMenu');
    }
  }
  
  // Запуск функции при загрузке страницы
  checkWidth();
  
  // Добавление обработчика события resize, чтобы функция вызывалась при изменении размера окна
  window.addEventListener('resize', checkWidth);
  