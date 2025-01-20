document.addEventListener('DOMContentLoaded', function () {
	const container = document.getElementById('input-container');
	const addRowButton = container.querySelector('.add-row');

	addRowButton.addEventListener('click', function () {
		const newRow = document.createElement('div');
		newRow.className = 'input-row input-row-50px fade-in';
		newRow.innerHTML = `
      <div class="input-box">
        <input class="ProductArr inputRadius10" type="text" name="ProductArticle[]" placeholder="Введите Артикул №" required>
      </div>
      <div class="input-box">
        <input class="ProductArr inputRadius10" type="text" name="ProductBrand[]" placeholder="Введите Брэнд №" required>
      </div>
      <button type="button" class="remove-row">✖</button>
    `;
		container.appendChild(newRow);

		// Remove the 'fade-in' class after animation to avoid reapplying it
		newRow.addEventListener('animationend', function () {
			newRow.classList.remove('fade-in');
		});

		updateButtons();
	});

	container.addEventListener('click', function (event) {
		if (event.target.classList.contains('remove-row')) {
			const row = event.target.closest('.input-row');
			row.style.opacity = '0';
			row.style.transform = 'translateY(-10px)';
			setTimeout(() => row.remove(), 500); // Delay to allow the transition to complete
			updateButtons();
		}
	});

	function updateButtons() {
		const rows = container.querySelectorAll('.input-row');
		rows.forEach(row => {
			row.querySelector('.remove-row').style.display = rows.length > 1 ? 'inline-block' : 'none';
		});
	}

	updateButtons();
});
