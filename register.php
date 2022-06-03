<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/login.css">
	<link href="https://fonts.googleapis.co
m/icon?family=Material+Icons" rel="stylesheet">
	<title>UwU Games | Вход</title>
</head>
<body>
	<div class="back-container" onclick="window.location='index.php'">
		<p class="back">&#8592; На главную</p>
	</div>
	<div class="login-wrapper">
		<div id="login-box">
			<h1 class="login-heading">Вход</h1>
			<form id="login" action="php/register.php" method="POST">
				<input class="login-input" type="text" placeholder="Никнейм" name="nickname" id="nickname"><br>
				<input class="login-input" type="mail" placeholder="Почта" name="mail">
				<input class="login-input" type="password" placeholder="Пароль" name="password" id="password"><br>
				<input class="login-input" type="password" placeholder="Пароль (ещё раз)" id="confirm-password"><br>
				<input class="login-input" type="date" name="birthday" id="birtday"><br>
				<input class="login-radio" type="radio" name="sex" id="male" onclick="document.getElementById('sex').value  = 'Мужской'">
				<input class="l
ogin-radio" type="radio" name="sex" id="female" onclick="document.getElementById('sex').value = 'Женский'">
				<input class="login-radio" type="radio" name="sex" id="helicopter" onclick="document.getElementById('sex').value = 'Боевой вертолёт Ми-28'"><br>
				<p class="register">Уже есть аккаунт? <a href="login.php">Войти</a></p>
				<input type="hidden" name="sex" id="sex">
			</form>
		</div>
	</div>

	<script defer src="js/register.js"></script>
</body>
</html>
