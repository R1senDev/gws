<?php
if (isset($_COOKIES['login'])) {
	$login = $_COOKIES['login'];
	if ($login == 'risenanderson' or $login == 'lord_laminat') {
		$isAdmin = 1;
	} else {
		$isAdmin = 0;
	}
} else {
	$login = '';
	$isAdmin = 0;
}
$end = 1
?>

<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet">
	<title>UwU Games | Админ-панель</title>
</head>
<body>
	<script>
	if ('<?= $login ?>'.length < 2) {
		window.location = 'codes/401.html';
	} else {
		if (<?= $isAdmin ?> == 0) {
			window.location = 'codes/403.html';
		}
	}
	</script>
		<p>"<?= $login ?>"; <?= $isAdmin ?>; <?= $end ?></p>
</body>
</html>
