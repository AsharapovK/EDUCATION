const html_login = `
	<div class="wrapper">
		<form id="loginForm">
			<h1>Вход</h1>
			<div class="input-box">
				<input class="logArr" type="text" name="Login" placeholder="Логин" required>
				<i class="bx bxs-user"></i>
			</div>

			<div class="input-box">
				<input class="logArr" type="password" name="Password" placeholder="Пароль" required>
				<i class="bx bxs-lock-alt"></i>
			</div>

			<div class="remember-forgot">
				<label for=""><input type="checkbox">Запомнить меня</label>
				<a href="#">Забыли пароль?</a>
			</div>
			<button type="submit" class="button">Войти</button>
			<div class="register-link">
				<p>Нет аккаунта? <a href="#">Зарегистрироваться</a></p>
			</div>
		</form>
	</div>
`;

const html_search = `
	<div class="wrapper_welcome">
		<div class="container">
			<h1>Проверяем пользователя...</h1>
		</div>
	</div>
`;


const html_search_false = `
	<div class="wrapper_welcome">
		<div class="container">
			<h1>Не нашли. Попробуйте еще</h1>
		</div>
	</div>
`;


const html_welcome = `
	<div class="wrapper_welcome">
		<div class="container">
			<h1>О, кажется нашли!</h1>
		</div>
	</div>
`;