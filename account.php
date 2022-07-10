<?php
if (isset($_GET['from'])) {
	$from = $_GET['from'];
} else {
	$from = 'index.php';
}
if (isset($_COOKIE['login'])) {
	$authorized = 1;
} else {
	$authorized = 0;
}
$level = 50;
$xp = 200;
if ($level == 0) {
	$minxp = 0;
} else {
	$minxp = 500 * 2**($level - 1);
}
?>

<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/account.css">
	<title>UwU Games | Профиль</title>
	<script>
	if (<?= $authorized ?> == 0) {
		window.location = 'codes/401.html';
	}
	</script>
</head>
<body>
<div class="back-container" onclick="window.location='<?= $from ?>'">
		<h1 class="back">&#8592; Назад</h1>
	</div>
	<div class="level-container">
		<table><tr><td style="vertical-align: middle"><div id="avatar"><p><?= substr($_COOKIE['login'], 0, 1) ?></p></div></td></tr></table>
		<div class="nick-wrapper">
			<p class="nick"><b><?= $_COOKIE['login'] ?></b> ~ <?= $level ?> уровень</p>
			<div class="level-wrapper">
				<p class="minxp"><?= $xp ?> xp</p>
				<progress max="<?= 500 * 2**$level ?>" value="<?= $xp - $minxp ?>"></progress>
				<p class="maxxp"><?= 500 * 2**($level) ?> xp</p>
			</div>
		</div>
	</div>
	<div class="logout" onclick="document.cookie = 'login=0; path=/; max-age=-1'; window.location = 'index.php?action=logout&login=<?= $login ?>'">
		<h2>Выйти из аккаунта</h2>
	</div>
	<script defer>
	if (<?= $level ?> == 0) {
		document.getElementById('avatar').style.backgroundColor = 'blue';
		document.getElementById('avatar').style.color = 'white';
		document.getElementById('avatar').style.borderColor = 'white';
	}
	if ('<?= $_COOKIE["login"] ?>' == 'risenanderson' || '<?= $_COOKIE["login"] ?>' == 'lord_laminat') {
		document.getElementById('avatar').style.backgroundColor = 'orange';
		document.getElementById('avatar').style.color = 'black';
		document.getElementById('avatar').style.borderColor = 'black';
	}
	</script>
</body>
</html>
