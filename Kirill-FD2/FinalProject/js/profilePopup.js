let isPopupOpen = false;

/**
 * Функция window.showProfilePopup() - создает и отображает всплывающее окно
 * с настройками фильтрации запросов
 */
window.showProfilePopup = function () {
	if (!isPopupOpen) {
		isPopupOpen = true;
		const popup = document.createElement('div');
		popup.id = 'loading-popup';
		popup.className = 'wrapper';
		popup.style.position = 'fixed';
		popup.style.top = '35%';
		popup.style.transform = 'translate(-50%, -50%)';
		popup.style.color = 'white';
		popup.style.padding = 'px';
		popup.style.zIndex = '1000';
		const rating = localStorage.getItem('settingRating') || 4;
		const delivery = localStorage.getItem('settingDelivery') || 6;
		popup.innerHTML = `
                                            <div class="container_search">
                                                <h3>Фильтр запросов</h3>
                                                <div class="settings-box">
                                                    <label class="labelSetting">Рейтинг:</label>
                                                    <input class="SettingArr" type="number" name="settingRating" value="${rating}" required min="1" max="5" step="0.1" pattern="^\d+(\.\d+)?$">
                                                </div>
                                                <div class="settings-box">
                                                    <label class="labelSetting">Доставка:</label>
                                                    <input class="SettingArr" type="number" name="settingDelivery" value="${delivery}" required min="1" max="10">
                                                </div>
                                                <div class="settings-button">
                                                    <button id="applyButton" type="button" class="apply">Применить</button>
                                                </div>
                                            </div>`;
		document.body.appendChild(popup);
		const applyButton = document.getElementById('applyButton');
		applyButton.addEventListener('click', function () {

			// Получаем значения из input
			const rating = document.querySelector('input[name="settingRating"]').value || 4.5;
			const delivery = document.querySelector('input[name="settingDelivery"]').value || 6;

			// Добавляем значения в локальные переменные
			localStorage.setItem('settingRating', rating);
			localStorage.setItem('settingDelivery', delivery);
			// Скрываем popup
			window.hideProfilePopup();
		});
	}
}





/**
 * Функция window.hideProfilePopup() - скрывает всплывающее окно
 */
window.hideProfilePopup = function () {
	const popup = document.getElementById('loading-popup');
	if (popup) {
		document.body.removeChild(popup);
		isPopupOpen = false;
	}
}