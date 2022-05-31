<?php
	$login = $_POST['nickname'];
	$password = $_POST['password'];
?>
<html>
<head>
   	<title>POST-запрос</title>
</head>
<body>
	<p>Переданный nickname: <?= $login ?></p>
	<p>Переданный password: <?= $password ?></p>
	<script>
	setTimeout(function() {
		window.location = '../index.php?login=<?= $login ?>&action=login';
	}, 3000);
	</script>
</body>
</html>
