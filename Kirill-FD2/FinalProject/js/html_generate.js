const html_size = screenSize()

const html_login = `
	<div class="wrapper" style="width: ${html_size.formWidth}px;height: ${html_size.conteinerHeight};">
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
		<div class="container">
			<h2>Ищем пользователя...</h2>
		</div>
	</div>
`;


const html_search_false = `
	<div class="wrapper" style="width: ${html_size.formWidth}px;height:auto;">
		<div class="container">
			<h2>Пользователь не найден</h2>
		</div>
	</div>
`;


const html_welcome = `
<div class="wrapper" style="width: ${html_size.formWidth}px; height:auto;">
  <div class="container">
    <h2>Кирилл, мы рады вас видеть!</h2>
    <div id="input-container">
      <button type="button" class="add-row">✙</button>
      <div class="input-row input-row-50px">
        <div class="input-box">
          <input class="ProductArr" type="text" name="ProductArticle[]" placeholder="Введите Артикул №" required>
        </div>
        <div class="input-box">
          <input class="ProductArr" type="text" name="ProductBrand[]" placeholder="Введите Брэнд №" required>
        </div>
      </div>
    </div>
  </div>
</div>
	`;


const html_table = `
    <div class="card">
      <header>
        <h2>Students</h2>
        <button type="button">
          <span class="material-symbols-outlined"> download </span>
          Download
        </button>
      </header>
      <div class="wrapper">
        <table>
          <thead>
            <tr>
              <th>
                Name
                <span class="draggable" onmousedown="initResize(0)"></span>
              </th>
              <th>
                Age
                <span class="draggable" onmousedown="initResize(1)"></span>
              </th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="cell-content">Joe Bloggs</span>
              </td>
              <td>
                <span class="cell-content">21</span>
              </td>
              <td>
                <span class="cell-content">Intermediate</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cell-content">Harry Hill</span>
              </td>
              <td>
                <span class="cell-content">24</span>
              </td>
              <td>
                <span class="cell-content">Expert</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cell-content">Bill Yates</span>
              </td>
              <td>
                <span class="cell-content">34</span>
              </td>
              <td>
                <span class="cell-content">Beginner</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cell-content">Jane Doe</span>
              </td>
              <td>
                <span class="cell-content">19</span>
              </td>
              <td>
                <span class="cell-content">Expert</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cell-content">Alice Gobel</span>
              </td>
              <td>
                <span class="cell-content">32</span>
              </td>
              <td>
                <span class="cell-content">Beginner</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="cell-content">Raul Jimenez</span>
              </td>
              <td>
                <span class="cell-content">29</span>
              </td>
              <td>
                <span class="cell-content">Intermediate</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
`;