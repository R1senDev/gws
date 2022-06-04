<?php
$nickname = !empty($_POST['nickname']) ? $_POST['nickname'] : '';
$mail = !empty($_POST['mail']) ? $_POST['mail'] : '';
$password = !empty($_POST['password']) ? $_POST['password'] : '';
$birthday = !empty($_POST['birthday']) ? $_POST['birthday'] : '';
$sex = !empty($_POST['sex']) ? $_POST['sex'] : '';
?>
<html>
<head>
   	<title>POST-запрос</title>
</head>
<body>
	<p>Переданный nickname: <?= $nickname ?></p>
	<p>Переданный mail: <?= $mail ?></p>
	<p>Переданный password: <?= $password ?></p>
	<p>Переданный birthday: <?= $birthday ?></p>
	<p>Переданный sex: <?= $sex ?></p>
</body>
</html>
