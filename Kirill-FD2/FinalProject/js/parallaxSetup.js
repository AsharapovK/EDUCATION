// // Инициализация Parallax.js
// window.addEventListener('load', function () {
// 	const parallaxContainer = document.getElementById('parallax-container');
// 	const parallaxInstance = new Parallax(parallaxContainer, {
// 		relativeInput: true,
// 		clipRelativeInput: true
// 	});
// });


window.addEventListener('load', function () {
	const parallaxContainer = document.getElementById('parallax-container');
	const parallaxInstance = new Parallax(parallaxContainer, {
		relativeInput: true,
		clipRelativeInput: true,
		calibrateX: true,
		calibrateY: true,
		invertX: false,
		invertY: false,
		limitX: false,
		limitY: false,
		scalarX: 13,
		scalarY: 13,
		frictionX: 0.1,
		frictionY: 0.1,
		originX: 0.5,
		originY: 0.5
	});
	
	// Включаем акселерометр
	if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function(event) {
			parallaxInstance.enable();
		}, true);
	}
});



