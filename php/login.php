<?php
	$login = $_POST['nickname'];
	$password = $_POST['password'];
	$from = $_GET['from'];
	$fromtype = $_GET['fromtype'];
	if ($fromtype == 'main') {
		$returnto = 'на главную страницу';
	}
?>
<html>
<head>
   	<title>POST-запрос</title>
</head>
<body>
<h1 class="text">Привет, <?= $login ?>! Вы успешно вошли в аккаунт. Возвращаем вас <?= $returnto ?></h1>
	<script>
	document.cookie = 'login=<?= $login ?>; path=/; max-age=604800';
	setTimeout(function() {
		window.location = '../<?= $from ?>?login=<?= $login ?>&from=login.php';
	}, 3000);
	</script>
</body>
</html>
