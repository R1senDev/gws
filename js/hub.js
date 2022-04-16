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
	['platformer', false],
	['clicker', false],
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

	// Change game_objects opacity on the page
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

// MEGA CRUTCH (by @R1senDev (cuz I'm very proud of it (no)))
document.addEventListener('DOMContentLoaded', function() {
	switchFilter('antistress');
	switchFilter('antistress');
});