<?php
$banTime = 'всегда';
$reason = '[Тут будет причина]';
?>

<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/ban.css">
	<title>UwU Games</title>
</head>
<body>
	<div>
		<h1>К сожалению, ваш аккаунт заблокирован 😢</h1>
	</div>
	<p>Нам пришлось заблокировать ваш аккаунт на<?= $banTime ?> по причине<br><br><span class="one"><b><?= $reason ?></b></span><br><br>Если вы считаете, что мы заблокировали вас по ошибке, напишите нам на почту <br><br><span><b>support@uwu-games.ru</b></span><br><br>(обязательно укажите свой никнейм и причину блокировки!)</p>
</body>
</html>
