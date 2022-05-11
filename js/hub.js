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

						// Something in faggot:
	// ïðîâåðÿåì, åñëè âñå ôèëüòðû îòêëþ÷åíû, òî îòîáðàæàåì âñå èãðû
	if (isClear()) {
		for (let game of games) {
			game.elem.style.opacity = 1;
		}
	}
}

// î÷èùàåò ôèëüòðû
function clearFilters() {
	for (let fltr of allFilters.keys()) {
		allFilters.set(fltr, false);
		document.getElementById(`${fltr}-filter`).style.color = 'black';
	}
	for (let game of games) {
		game.elem.style.opacity = 1;
	}
}

// åñëè âñå ôèëüòðû îòêëþ÷åíû, âîçâðàùÿåò true
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

document.addEventListener('DOMContentLoaded', function() {
	// Crutch
	switchFilter('antistress');
	switchFilter('antistress');
});
