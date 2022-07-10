<?php
$login = $_POST['nickname'];
$password = $_POST['password'];
$passwordHash = sha1($password . substr($login, 0, 2));
$remember = $_POST['remember'];
$from = $_GET['from'];
?>

<html>
<head>
   	<title>UwU Games | Вход</title>
</head>
<body>
	<h1 class="text">Привет, <?php echo $login ?>! Вы успешно вошли в аккаунт. Редирект через 3 секунды...</h1>
	<script>
	let expStr = '';
	if ('<?= $remember ?>' == 'on') {
		expStr = '; max-age=604800';
	}
	document.cookie = 'login=<?php echo $login; ?>; path=/' + expStr;
	setTimeout(function() {
		window.location = '../<?php echo $from ?>?from=login.php';
	}, 3000);
	</script>
</body>
</html>
