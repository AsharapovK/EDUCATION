const html_size = screenSize()

const html_login = `
	<div class="wrapper" style="width: ${html_size.formWidth}px;height: ${html_size.conteinerHeight};">
		<form id="loginForm">
			<h1>Вход</h1>
			<div class="input-box">
				<input class="logArr" type="text" name="Login" placeholder="Логин" required autocomplete="username">
				<i class="bx bxs-user"></i>
			</div>

			<div class="input-box">
				<input class="logArr" type="password" name="Password" placeholder="Пароль" required autocomplete="password">
				<i class="bx bxs-lock-alt"></i>
			</div>

			<div class="remember-forgot">
				<label id="remember"><input id="rememberCheck" type="checkbox">Запомнить меня</label>
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
	<div class="wrapper" style="width: ${html_size.formWidth}px;height: auto;">
		<div class="container_search">
		<div class="spinner"><i class="fa-solid fa-spinner fa-spin-pulse"></i></div>
			<h3>Ищем пользователя...</h3>
		</div>
	</div>
`;


const html_search_false = `
	<div class="wrapper" style="width: ${html_size.formWidth}px;height: auto;">
		<div class="container_search">
		<div class="spinner"><i class="fa-solid fa-triangle-exclamation fa-shake"></i></div>
			<h3>Пользователь не найден</h3>
		</div>
	</div>
`;

function html_function(loginName) {
	const html_welcome = `
	<div class="wrapper wrapper_result" style="width: ${html_size.formWidth}px; height:${html_size.formHeight}px">
		<h2 id="disableText">Анализ конкурентных позиций Emex.ru</h2>
		<div class="profile_container">
			<div class="play">
				<i class="fa-solid fa-play fa-beat" onclick="sendData()"></i>
				<span id="playText" class="playText">Ctrl+Enter</span>
			</div>
			<h2 id="enableText">Анализ конкурентных позиций Emex.ru</h2>
			<div class="profile">
				<span class="ProfileText">${loginName}</span>
				<i onclick="showProfilePopup()" class="fa-solid fa-user-gear"></i>
			</div>
		</div>
		<div class="container">
			<div id="input-container">
				<div class="input-row input-row-50px">
					<div class="input-box">
						<input class="ProductArr inputRadius10" type="text" name="ProductArticle[]" autocomplete="detail"
							placeholder="Введите Артикул" value="CUK2533-2" required>
					</div>
					<div class="input-box">
						<input class="ProductArr inputRadius10" type="text" name="ProductBrand[]" autocomplete="brand"
							placeholder="Введите Брэнд" value="MANN" required>
					</div>
					<button type="button" class="add-row" onclick="addRowButton()">
						<i class="fa-regular fa-square-plus"></i>	
					</button>
				</div>
			</div>
			<div class="card">
				<div class="cardPrewiew">
					<i class="fa-brands fa-sistrix"></i>
				</div>
			</div>
		</div>
	</div>
`;

	return html_welcome
}


