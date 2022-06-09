let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

function fitCanvas() {
	canvas.width = window.clientWidth;
	canvas.height = window.clientHeight;
}
window.addEventListener('resize', fitCanvas);

let sprites = {
	menuBg: new Image(1, 1),
	torch: new Image(1, 1),
	knight1: {
		idle: new Image(1, 1),
		attacking: new Image(1, 1),
		dead: new Image(1, 1),
	},
	knight2: {
		idle: new Image(1, 1),
		attacking: new Image(1, 1),
		dead: new Image(1, 1),
	},
	eye: {
		idle: new Image(1, 1),
		dead: new Image(1, 1),
	},
	vampire: {
		idle: new Image(1, 1),
		dead: new Image(1, 1),
	},
	sword: {
		idle: new Image(1, 1),
		dead: new Image(1, 1),
	},
};
let percentage = 0;
function loadResources() {
	// Count of resource files to load
	// Edit it if percentage is incorrect
	let resourcesCount = 5;
	percentage = 0;

	sprites.knight1.idle.src = 'resources/knight1idle.png';
	sprites.knight1.idle.onload = function() {percentage += 100 / resourcesCount};

	sprites.knight2.idle.src = 'resources/knight2idle.png';
	sprites.knight2.idle.onload = function() {percentage += 100 / resourcesCount};

	sprites.eye.idle.src = 'resources/eyeidle.png';
	sprites.eye.idle.onload = function() {percentage += 100 / resourcesCount};

	sprites.vampire.idle.src = 'resources/vampireidle.png';
	sprites.vampire.idle.onload = function() {percentage += 100 / resourcesCount};

	sprites.sword.idle.src = 'resources/swordidle.png';
	sprites.sword.idle.onload = function() {percentage += 100 / resourcesCount};
}

class Particle {
	move() {
		this.x += this.speed.x;
		this.y += this.speed.y;
		this.speed.y += this.gravity;
	}
	constructor(x, y, w, h, xSpeed, ySpeed, gravity, movingDelay, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = {
			x: xSpeed,
			y: ySpeed
		};
		this.gravity = gravity;
		this.movingDelay = movingDelay;
		this.color = color;
		this.moveInterval = setInterval(this.move, movingDelay);
	}
	draw(scale=1) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.w, this.h);
	}
}
let particlesLimit = 200;
let particles = [];

class particleGenerator {
	constructor(x1, y1, x2, y2, w, h, minXSpeed, maxXSpeed, minYSpeed, maxYSpeed, spawnDelay, minClusterSize, maxClusterSize, gravity, movingDelay, color) {
		this.dots = [[x1, y1], [x2, y2]];
		this.minXSpeed = minXSpeed;
		this.minYSpeed = minYSpeed;
		this.spawnDelay = spawnDelay;
		this.minClusterSize = minClusterSize;
		this.maxClusterSize = maxClusterSize;
		this.gravity = gravity;
		this.movingDelay = movingDelay;
		this.color = color;
		this.spawnInterval = setInterval(function() {
			if (particles.length < particlesLimit) {
				this.spawn();
			}
		}.bind(this), this.spawnDelay);
	}
	spawn() {
		particles.push(new Particle(Math.floor(Math.random() * (this.dots[1][0] - this.dots[0][0] + 1)) + this.dots[0][0], Math.floor(Math.random() * (this.dots[1][1] - this.dots[0][1] + 1)) + this.dots[0][1], this.w, this.h, Math.floor(Math.random() * (this.maxXSpeed - this.minXSpeed + 1)) + this.minXSpeed, Math.floor(Math.random() * (this.maxYSpeed - this.minYSpeed + 1)) + this.minYSpeed, this.gravity, this.movingDelay, this.color));
	}
	stop() {
		clearInterval(this.spawnInterval);
	}
}
let particleGenerators = [];

let loc = 'mainMenu';

function redraw() {
	if (loc == 'mainMenu') {
		context.drawImage(menuBg, 0, 0);
	}

	for (let particle of particles) {
		context.drawImage(menuBg, particle.x - 10, particle.y - 10, particle.w + 20, particle.h + 20, particle.x - 10, particle.y - 10);
		particle.draw();
	}
}
