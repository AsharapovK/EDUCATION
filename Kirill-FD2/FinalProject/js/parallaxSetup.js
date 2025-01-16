window.addEventListener('load', function () {
	const parallaxContainer = document.getElementById('parallax-container');
	const parallaxLayers = parallaxContainer.querySelectorAll('.parallax-layer');

	// Функция обработки движения
	function handleOrientation(event) {
			const tiltX = event.gamma; // Наклон влево/вправо
			const tiltY = event.beta;  // Наклон вперед/назад

			// Нормализация данных
			const normalizedX = tiltX / 45; // Приводим диапазон к -1..1
			const normalizedY = tiltY / 45;

			parallaxLayers.forEach(layer => {
					const depth = parseFloat(layer.getAttribute('data-depth'));
					const xOffset = normalizedX * depth * 100;
					const yOffset = normalizedY * depth * 100;

					layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
			});
	}

	// Проверяем, поддерживает ли устройство события ориентации
	if (window.DeviceOrientationEvent) {
			window.addEventListener('deviceorientation', handleOrientation);
	} else {
			console.warn('DeviceOrientation не поддерживается на этом устройстве.');
	}
});