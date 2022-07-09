<?php
//if isset ()
?>

<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/account.css">
	<title>UwU Games | Профиль</title>
</head>
<body>
	<div class="back-container" onclick="window.location='index.php?login=<?= $login ?>'">
		<h1 class="back">&#8592; На главную</h1>
	</div>
	<div class="logout" onclick="document.cookie = 'login=0; path=/; max-age=-1'; window.location = 'index.php?action=logout&login=<?= $login ?>'">
		<h2>Выйти из аккаунта</h2>
	</div>
</body>
</html>
