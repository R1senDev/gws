<?php
if (isset($_GET['from'])) {
	$from = $_GET['from'];
} else {
	$from = '';
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
	<div class="back-container" onclick="window.location='index.php?login=<?= $login ?>'">
		<p class="back">&#8592; На главную</p>
	</div>
	<div class="login-wrapper">
		<div id="login-box">
			<h1 class="login-heading">Вход</h1>
			<form id="login" action="php/login.php?from=<?= $from ?>" method="POST">
				<input class="login-input" type="text" placeholder="Никнейм" name="nickname" id="nickname"><br>
				<input class="login-input" type="password" placeholder="Пароль" name="password" id="password"><br>
				<input id="submit" class="login-button" type="submit" value="Войти">
				<p class="register">Нет аккаунта? <a href="register.php">Зарегистрироваться</a></p>
			</form>
		</div>
	</div>

	<script>
	function getCookie(name) {
		let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	if (getCookie('login') != undefined) {
		window.location = 'account.php';
	}
	</script>
	<script defer src="js/login.js"></script>
</body>
</html>
