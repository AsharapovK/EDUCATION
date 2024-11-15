// Хранилище карточек товара 
const cars = [];



/**
 * Функция добавления нового автомобиля
 * Получает данные из формы (инпуты и селект) и добавляет новый автомобиль в хранилище
 * @function addCar
 */
function addCar() {
	//Получаем данные из инпутов
	const impitArr = document.querySelectorAll('input[name]');
	const selectArr = document.querySelector('select');

	// Объявляем карточку товара 
	const car = {}

	// Перебираем полученные данные и вставляем в карточку товара
	for (const impit of impitArr) {
		car[impit.name] = impit.value;
	}
	cars.push(car)
	console.log(`Автомобиль ${impitArr[0].value} добавлен в хранилище`)

	clearFlow()
	renderCars()
}

function clearFlow() {
	const flowDiv = document.querySelector('.cardsFlow')
	flowDiv.innerHTML = ''
}

/**
 * Функция отображения карточек товаров
 * Берет данные из хранилища cars и отображает карточки товаров
 * @function renderCars
 */
function renderCars() {
	for (const car of cars) {
		const flowDiv = document.querySelector('.cardsFlow')

		flowDiv.innerHTML += `
				<!-- Шаблон карточки товара -->
		<div class="card" style="width: 18rem;">
			<img src="${car.imgUrl}" class="card-img-top" alt="...">
			<div class="card-body">
				<h5 class="card-title">${car.brand} ${car.model}</h5>
				<ul>
					<li>
						<div class="color">
							<span>Цвет </span>
							<div class="color" style="background-color:${car.color}; width: 20px; height: 20px;"></div>
						</div>
					</li>
					<li>
						<p>Год выпуска: ${car.year}</p>
					</li>
					<li>
						<p>Цена: ${car.price}</p>
					</li>
				</ul>
				<a href="#" class="btn btn-primary">Купить</a>
			</div>
		</div>`
	}
}
