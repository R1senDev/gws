class Game {
	constructor(name, tags) {
		this.elem = document.getElementById(name);
		this.name = name;
		this.tags = tags;
	}
}

let games = [new Game('uwu', ['antistress']), new Game('lineRace', ['race'])];
let allFilters = new Map(
	[
	['antistress', true],
	['race', true],
	['platformer', true],
	['clicker', true]
	]
);

function switchFilter(filterName) {
	
	// set opposite value for choosen filter
	allFilters.set(filterName, !allFilters.get(filterName));

	// проверить, есть ли активные фильтры
	if (isFiltersClear()) {
		clearFilters();
	}

	// change filter_object color on the page
	if (allFilters.get(filterName)) {
		document.getElementById(`${filterName}-filter`).style.color = 'black';
	} else {
		document.getElementById(`${filterName}-filter`).style.color = 'green';
	}

	// change game_objects opacity on the page
	for (let game of games) {
		if (game.tags.includes(filterName) && !allFilters.get(filterName)) {
			game.elem.style.opacity = 1;
		} else if (game.tags.includes(filterName)) {
			game.elem.style.opacity = 0.2;
		}
	}
}

function clearFilters() {
	for (let fltr of allFilters.keys()) {
		allFilters.set(fltr, true);
	}
}

function isFiltersClear() {
	for (let fltr of allFilters.keys()) {
		if (allFilters.get(fltr)) {
			return false;
		}
	}
	return true;
}