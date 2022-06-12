<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/account.css">
	<title>UwU Games | Профиль</title>
</head>
<body>
	<div class="back-container" onclick="window.location='index.php?login=<?= $login ?>'">
		<p class="back">&#8592; На главную</p>
	</div>
	<div class="logout" onclick="document.cookie = 'login=0; path=/; max-age=-1'">
		<h2>Выйти из аккаунта</h2>
	</div>
</body>
</html>
