class Game {
	constructor(name, tags) {
		this.elem = document.getElementById(name);
		this.name = name;
		this.tags = tags;
	}
}

let games = [new Game('uwu', ['antistress']), new Game('lineRace', ['race'])];
let allFilters = ['antistress', 'race', 'platformer', 'clicker'];

function switchFilter(value) {
	alert(`switchFilter(${value})`);
	for (let i of allFilters) {
		document.getElementById(`${i}-filter`).style.color = 'black';
	}
	document.getElementById(`${value}-filter`).style.color = 'green';
	if (value == null) {
		for (let i if allFilters) {
			document.getElementById(`${i}-filter`).style.color = 'black';
		}
		for (let i of games) {
			i.elem.style.opacity = 1;
		}
	} else {
		document.getElementById(`${value}-filter`).style.color = 'green';
		for (let i of games) {
			if (i.tags.includes(value)) {
				alert('Set opacity for', i.name, ' to 1');
				i.elem.style.opacity = 1;
			} else {
				alert('Set opacity for', i.name, ' to 0.2');
				i.elem.style.opacity = 0.2;
			}
		}
	}
}
switchFilter(null);
