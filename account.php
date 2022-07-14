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
$level = 0;
$xp = 0;
if ($level == 0) {
	$minxp = 0;
} else {
	$minxp = 30 * 2**($level - 1);
}
$coins = 0;
$gems = 0;
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
	<table class="main-table">
		<tr>
			<td colspan="2" class="level-container">
				<table class="avatar-table"><tr><td style="vertical-align: middle"><div id="avatar"><p><?= substr($_COOKIE['login'], 0, 1) ?></p></div></td></tr></table>
				<div class="nick-wrapper">
					<p class="nick"><b><?= $_COOKIE['login'] ?></b> ~ <?= $level ?> уровень</p>
					<div class="level-wrapper">
						<p class="minxp"><?= $xp ?> xp</p>
						<progress max="<?= 50 * 2**$level ?>" value="<?= $xp - $minxp ?>"></progress>
						<p class="maxxp"><?= 50 * 2**($level) ?> xp</p>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td class="balance">
				<table class="balance-wrapper">
					<tr>
						<td>
							<h1>Баланс:</h1>
							<table class="balance-body">
								<tr>
									<td>
										<h2><?= $coins ?> монет</h2>
									</td>
									<td>
										<div class="r-column">
											<h2>Купить &#128722;</h2>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<h2><?= $gems ?> алмазов</h2>
									</td>
									<td>
										<h2 class="r-column">Купить &#128722;</h2>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
			<td class="invite">
				<h1>Пригласи друга &ndash; получи монеты</h1>
				<h2>Отправь другу эту ссылку, и если он перейдёт по ней и зарегистрируется, ты получишь 500 монет!</h2>
				<input type="text" class="reflink" value="uwu-games.ru/register.php?from=index.php&ref=<?= $_COOKIE['login'] ?>" disabled>
			</td>
		</tr>
		<tr>
			<td colspan="2" class="logout" onclick="document.cookie = 'login=0; path=/; max-age=-1'; window.location = 'index.php?action=logout&login=<?= $login ?>'">
				<h2>Выйти из аккаунта</h2>
			</td>
		</tr>
	</table>

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
