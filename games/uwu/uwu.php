<?php
if (isset($_GET['login'])) {
	$login = $_GET['login'];
} else {
	$login = '';
}
?>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="style.css">
	<title>UwU</title>
</head>
<body>
	<canvas id="canvas"></canvas>

	<script>
	function redirect(addr) {
		alert(`${addr}?login=<?= $login ?>%action=uwu`);
		window.location = `${addr}?login=<?= $login ?>%action=uwu`;
	}
	</script>
	<script type="text/javascript" src="main.js"></script>
</body>
</html>
