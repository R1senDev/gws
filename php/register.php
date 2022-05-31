<?php
	$nickname = !empty($_POST['nickname']) ? $_POST['nickname'] : '';
	$password = !empty($_POST['password']) ? $_POST['password'] : '';
?>
<html>
<head>
   	<title>POST-запрос</title>
</head>
<body>
	<p>Переданный nickname: <?= $nickname ?></p>
	<p>Переданный password: <?= $password ?></p>
</body>
</html>
