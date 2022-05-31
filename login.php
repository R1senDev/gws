<?php
if (isset($_GET['login'])) {
	$login = $_GET['login'];
} else {
	$login = '';
}
?>
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
			<form id="login" action="php/login.php" method="POST">
				<input class="login-input" type="text" placeholder="Никнейм" name="nickname" id="nickname"><br>
				<input class="login-input" type="password" placeholder="Пароль" name="password" id="password"><br>
				<input id="submit" class="login-button" type="submit" value="Войти">
				<p class="register">Нет аккаунта? <a href="register.html">Зарегистрироваться</a></p>
			</form>
		</div>
	</div>

<script>
if ('<?= $login ?>'.length > 0) {
	window.location = 'account.php?login=<?= $login ?>';
}
</script>
	<script defer src="js/login.js"></script>
</body>
</html>
