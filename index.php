<?php
if (isset($_GET['action'])) {
	$action = $_GET['action'];
} else {
	$action = '';
}
$isAdmin = false;
if (isset($_COOKIE['login'])) {
	$accText = 'Мой аккаунт';
	$accLink = 'account.php';
} else {
	$accText = 'Войти';
	$accLink = 'login.php';
}
?>
<html>

<!-- Head -->
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css/hub.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<title>UwU Games | Главная</title>
</head>

<!-- Body -->
<body>
	<div id="login-overlay">
		<div id="login-box">
			<h1 class="login-heading">Вход</h1>
		</div>
	</div>
	<div id="achivement-wrapper" class="achivement-wrapper">
		<div class="achivement">
			<h1 id="achivement-text">Новое достижение!</h1>
			<h1 id="achivement-xp">+0 XP</h1>
		</div>
	</div>

	<!-- Page's Header -->
	<div class="header-protector fixed-color"></div>
	<div class="header">
	<img class="icon1" src="resources/logo.jpg" onclick="window.location = 'index.php?login=<?= $login ?>'">
		<div class="header-right">
			<img class="page-theme-switcher" id="theme-button" src="resources/dark-theme-button.svg" onclick="switchTheme()">
			<img class="page-theme-switcher" id="pause-button" src="resources/pause.svg" onclick="backgroundShift.pause()">
			<img class="page-theme-switcher" id="unittest-button" src="resources/bug.svg" onclick="unitTest()"><br>
			<div onclick="window.location='<?= $accLink ?>'">
			<p id="header-login" class="header-login"><?= $accText ?> <span class="material-icons">login</span></p>
			</div>
		</div>
		<h1 class="header-name" href="index.php?login=<?= $login ?>">UwU Games</h1>
	</div>

	<div class="crutch fixed-color"></div>

	<!-- Page's description -->
	<div class="burger">
		<div class="burger-button">
			<p class="burger-button-text">Магазин &#128722;</p>
		</div>
		<hr>
	</div>
	
	<!-- Left column with Filters and Ads -->
	<div class="left-coloumn-container fixed-color">

		<!-- All Filters -->
		<div class="left-coloumn" id="left-coloumn">
			<p class="genres-title">Игры по жанрам</p>

			<!-- Clear button -->
			<div class="genre-clear fixed-color" onclick="clearFilters()">
				<p class="genre-label" id="genre-clear">Сбросить фильтр</p>
			</div>
			<hr>

			<!-- Antistress -->
			<div class="genre fixed-color" onclick="switchFilter('antistress')">
				<p class="genre-label" id="antistress-filter">Антистрессы (0)</p>
			</div>
			<hr>

			<!-- Race -->
			<div class="genre fixed-color" onclick="switchFilter('race')">
				<p class="genre-label" id="race-filter">Гонки (0)</p>
			</div>
			<hr>

			<!-- Roguelike -->
			<div class="genre fixed-color" onclick="switchFilter('roguelike')">
				<p class="genre-label" id="roguelike-filter">Рогалики (0)</p>
			</div>
			<!--hr>

			< Clicker >
			<div class="genre fixed-color" onclick="switchFilter('clicker')">
				<p class="genre-label" id="clicker-filter">Кликеры (0)</p>
			</div-->
		</div>

		<!-- All Ads -->
		<div class="ad-left-container">
			<div class="ad-left-text fixed-color">Р<br>е<br>к<br>л<br>а<br>м<br>а</div>

			<!-- First Ad banner -->
			<img class="ad-left" src="resources/ad.jpg" onclick="grantAchivement(0)">

			<!-- Next Ad banners... -->
		</div>

	</div>

	<!-- Games' field -->
	<div class="games-container-container fixed-color">

		<!-- First game container -->
		<div class="games-container fixed-color">

			<!-- UwU -->
			<div class="game-tile fixed-color requires-border" id="uwu" onclick="window.location = 'games/uwu/uwu.html'">
				<div class="game-tile-overlay fixed-color"></div>
			</div>

			<!-- lineRace -->
			<div class="game-tile fixed-color" id="lineRace" onclick="window.location = 'games/lineRace/lineRace.html'">
				<div class="game-tile-overlay fixed-color"></div>
			</div>

			<!-- The Blade -->
			<div class="game-tile fixed-color" id="theBlade" onclick="window.location = 'games/theBlade/theBlade.php'">
				<div class="game-tile-overlay fixed-color"></div>
			</div>

		</div>

		<!-- Next game containers... -->
	</div>

	<!-- Running a JavaScript for the main page -->
	<script defer src="js/index.js"></script>
</body>
</html>
