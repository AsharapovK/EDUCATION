/**
 * Добавляет строку ввода артикула и бренда
 * @function addRowButton
 */
addRowButton = function () {
	const container = document.getElementById('input-container');
	const maxRows = Math.floor(container.offsetHeight / 60);

	const currentRows = container.querySelectorAll('.input-row').length;
	if (currentRows < maxRows) {
		const newRow = document.createElement('div');
		newRow.className = 'input-row input-row-50px fade-in';
		newRow.innerHTML = `
								<div class="input-box">
										<input class="ProductArr inputRadius10" type="text" name="ProductArticle[]" placeholder="Введите Артикул" required>
								</div>
								<div class="input-box">
										<input class="ProductArr inputRadius10" type="text" name="ProductBrand[]" placeholder="Введите Брэнд" required>
								</div>
								<button type="button" class="remove-row" onclick="removeRow(this)" style="width: 100%;"><i class="fa-regular fa-square-minus"></i></button>
						`;
		container.appendChild(newRow);

		newRow.addEventListener('animationend', function () {
			newRow.classList.remove('fade-in');
		});
	} else {
		console.log('Достигнуто максимальное количество добавлений.');
	}
};






/**
 * Удаляет строку ввода артикула и бренда
 * @function removeRow
 * @param {HTMLElement} removeRowButton - кнопка удаления строки
 */
function removeRow(removeRowButton) {
	const row = removeRowButton.closest('.input-row');
	row.style.opacity = '0';
	row.style.transform = 'translateY(-10px)';
	setTimeout(() => row.remove(), 500);
}
