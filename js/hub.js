class Game {
	constructor(name, tags) {
		this.elem = document.getElementById(name);
		this.name = name;
		this.tags = tags;
	};
	isVisible = function() {
		for (let tag of this.tags) {
			if (allFilters.get(tag)) {
				return true;
			}
		}
		return false;
	}
}

let games = [new Game('uwu', ['antistress']), new Game('lineRace', ['race'])];
let allFilters = new Map([
	['antistress', false],
	['race', false],
	//['platformer', false],
	//['clicker', false],
]
);

function switchFilter(filterName) {
	// Kakoj nahuy "chosen", eto, blyat, nepravil-
	// nyj glagol, choose-chose-chosen, ti blyat v
	// shkole ne uchilsya, shto li, suka???
	//                        v~~~~~~
	// Set opposite value for choosen filter
	allFilters.set(filterName, !allFilters.get(filterName));

	// Change filter_object color on the page
	if (!allFilters.get(filterName)) {
		document.getElementById(`${filterName}-filter`).style.color = 'black';
	} else {
		document.getElementById(`${filterName}-filter`).style.color = 'green';
	}

	// Change gameObjects opacity on the page
	for (let game of games) {
		if (game.isVisible()) {
			game.elem.style.opacity = 1;
		} else {
			game.elem.style.opacity = 0.2;
		}
	}

	// checks if all filters are disabled, then displays all games
	if (isClear()) {
		for (let game of games) {
			game.elem.style.opacity = 1;
		}
	}
}

// clears filters
function clearFilters() {
	for (let fltr of allFilters.keys()) {
		allFilters.set(fltr, false);
		document.getElementById(`${fltr}-filter`).style.color = 'black';
	}
	for (let game of games) {
		game.elem.style.opacity = 1;
	}
}

// returns true if all filters are disabled
function isClear() {
	for (let fltr of allFilters.keys()) {
		if (allFilters.get(fltr)) {
			return false;
		}
	}
	return true;
}

// Function for theme switch button
let activeLightTheme = true;
function switchTheme() {
	// Do not delete or rename this variables by embedding it directly
	// into the for loop, otherwise problems may arise.
	// With your health.
	let ps = document.getElementsByTagName('p');
	let divs = document.getElementsByTagName('div');

	let newTextColor;
	// Switches the background
	if (activeLightTheme) {
		document.getElementById('theme-button').src = "resources/light-theme-button.svg";
		document.body.style.backgroundImage = "url('resources/bg-dark.png')";
		newTextColor = 'white';
		activeLightTheme = false;
	} else {
		document.getElementById('theme-button').src = "resources/dark-theme-button.svg";
		document.body.style.backgroundImage = "url('resources/bg-light.png')";
		newTextColor = 'black';
		activeLightTheme = true;
	}

	for (let elem of ps) {
		if (!elem.className.includes(' fixed-color') && elem.className != 'fixed-color') {
			elem.style.color = newTextColor;
		}
	}
	if (activeLightTheme) {
		for (let elem of divs) {
			if (!elem.className.includes(' fixed-color') && elem.className != 'fixed-color') {
				elem.style.backgroundColor = 'rgb(204, 204, 255)';
			}
			if (elem.className.includes('requires-border')) {
				elem.style.borderStyle = 'none';
				elem.style.backgroundPosition = '0 0';
			}
		}
	} else {
		for (let elem of divs) {
			if (!elem.className.includes(' fixed-color') && elem.className != 'fixed-color') {
				elem.style.backgroundColor = 'rgb(153, 51, 153)';
			}
			if (elem.className.includes('requires-border')) {
				elem.style.borderColor = 'white';
				elem.style.borderStyle = 'solid';
				elem.style.backgroundPosition = '-3px -3px';
			}
		}
	}
	document.getElementById('genre-clear').style.color = 'rgb(72, 90, 139)';
	document.getElementById('left-coloumn').style.color = 'black';
}

let backgroundShift = {
	x: 0,
	y: 0,

	// It makes the background "ehat". Like your "kukuha".
	playing: false,
	playPause: function() {
		if (playing) {
			backgroundShift.pause();
		} else {
			backgroundShift.play();
		}
		backgroundShift.playing = !backgroundShift.playing
	},
	engine: setInterval(function() {
		if (backgroundShift.playing) {
			backgroundShift.x += 0.25;
			backgroundShift.y -= 0.125;
			document.body.style.backgroundPosition = `${backgroundShift.x}px ${backgroundShift.y}px`;
		}
	}, 30),
	pause: function() {
		backgroundShift.playing = false;
	},
	play: function() {
		backgroundShift.playing = true;
	}
};

let achivements = new Map([
	[-1, {name: 'Тестовое достижение', xp: 0}],
	[0, {name: 'Заскамили мамонта', xp: 0}],
]);
let achivementQueue = [];
function achivementPopup(name, xp) {
	let wrapper = document.getElementById('achivement-wrapper');
	let heading = document.getElementById('achivement-text');
	let xpText = document.getElementById('achivement-xp');
	heading.textContent = 'Новое достижение!';
	xpText.textContent = `+${xp} XP`;
	xpText.style.opacity = '0%';
	wrapper.style.margin = '50px 0 0 -20px';
	let opacity = 0;
	setInterval(function() {
		opacity++;
		if (opacity < 100) {
			clearInterval(this);
			delete opacity;
		} else {
			wrapper.style.opacity = `${opacity}%`;
		}
	}, 10);
	setTimeout(function() {
		let opacity = 100;
		setInterval(function() {
			opacity -= 2;
			if (opacity < 0) {
					clearInterval(this);
					delete opacity;
				} else {
					heading.style.opacity = `${opacity}%`;
				}
		}, 1);
		setTimeout(function() {
			heading.textContent = name;
			let opacity = 0;
			setInterval(function() {
				opacity += 2;
				if (opacity > 100) {
						clearInterval(this);
						delete opacity;
					} else {
						heading.style.opacity = `${opacity}%`;
						xpText.style.opacity = `${opacity}%`;
					}
			}, 1);
			setTimeout(function() {
				wrapper.style.margin = '-100px 0 0 -20px';
				let opacity = 100;
				setInterval(function() {
					opacity--;
					if (opacity < 0) {
						clearInterval(this);
						delete opacity;
					} else {
						wrapper.style.opacity = `${opacity}%`;
					}
				}, 10);
			}, 3000);
		}, 200);
	}, 2000);
}
function grantAchivement(id) {
	achivementQueue.push(id);
}
let achivementEngine = setInterval(function() {
	if (achivementQueue.length > 0) {
		let achivementDetails = achivements.get(achivementQueue.shift());
		achivementPopup(achivementDetails.name, achivementDetails.xp);
	}
}, 7000);

// Use this function to run unit tests.
// It can be called by pressing a "debug" button in the header.
function unitTest() {
	grantAchivement(-1);
}

document.addEventListener('DOMContentLoaded', function() {
	// Crutch
	switchFilter('antistress');
	switchFilter('antistress');

	backgroundShift.pause();
});
