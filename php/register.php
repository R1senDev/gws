<?php
$from = $_GET['from'];
$nickname = $_POST['nickname'];
$mail = $_POST['mail'];
$password = $_POST['password'];
$passwordHash = sha1($password . substr($nickname, 0, 2));
$birthday = $_POST['birthday'];
$sex = $_POST['sex'];
//$code = rand(1000, 9999);
?>
<html>
<head>
   	<title>POST-запрос</title>
</head>
<body>
	<p>Переданный nickname: <?= $nickname ?></p>
	<p>Переданный mail: <?= $mail ?></p>
	<p>Переданный password: <?= $password ?></p>
	<p>Хэш переданного password: <?= $passwordHash ?></p>
	<p>Переданный birthday: <?= $birthday ?></p>
	<p>Переданный sex: <?= $sex ?></p>
	<p>Код подтверждения: <?= $code ?></p>
<script>
document.cookie = 'login=<?= $nickname ?>; path=/; max-age=604800';
setTimeout(function() {
	window.location = '../<?= $from ?>';
}, 3000);
</script>
</body>
</html>
