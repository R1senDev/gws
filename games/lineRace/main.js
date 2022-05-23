let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let active_keys = new Map();
active_keys = {
	"KeyW": false,
	"KeyA": false,
	"KeyS": false,
	"KeyD": false
};

const bgColor = "rgb(61, 61, 61)";
const debugColor = "#e64c0c";
const fps = 30;
const test_speed = 5;
const test_rotate_speed = 5;
let gameIsActive = true;

canvas.width = document.body.clientWidth + 15;
canvas.height = document.body.clientHeight + 25;
document.body.style.overflow = 'hidden';


function main() {
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
};
main();

function degToRad(degrees) {
	return degrees * (Math.PI / 180);
};

function middleDot(d1, d2) {
	return [(d1[0] + d2[0]) / 2, (d1[1] + d2[1]) / 2];
}

class Rectangle {
	constructor(node, width, height, angle = 0, speed = test_speed, color = 'green') {
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.node = node;
		this.color = color;
	}

	corner1() {
		let x1 = Math.cos(degToRad(this.angle)) * this.width;
		let y1 = Math.sin(degToRad(this.angle)) * this.width;
		return [this.node[0] + x1, this.node[1] + y1];
	}

	corner3() {
		let x3 = -Math.cos(degToRad(90 - this.angle)) * this.height;
		let y3 = Math.sin(degToRad(90 - this.angle)) * this.height;
		return [this.node[0] + x3, this.node[1] + y3];
	}

	corner2() {
		let [x1, y1] = this.corner1();
		let [x3, y3] = this.corner3();
		return [x1 + x3 - this.node[0], y1 + y3 - this.node[1]];
	}

	draw(color = this.color) {
		context.beginPath();
		moveTo(this.node[0], this.node[1]);

		let [x1, y1] = this.corner1();
		context.lineTo(x1, y1);
		//console.log(x1, y1);

		let [x2, y2] = this.corner2();
		context.lineTo(x2, y2);
		//console.log(x2, y2);

		let [x3, y3] = this.corner3();
		context.lineTo(x3, y3);
		//console.log(x3, y3);

		context.lineTo(this.node[0], this.node[1]);
		//console.log(this.node[0], this.node[1]);

		context.fillStyle = color;
		context.fill();
		context.closePath();
	}

	rotate(dAngle) {
		//this.draw(bgColor);
		let X1 = (this.corner3()[0] + this.corner1()[0]) / 2;
		let Y1 = (this.corner3()[1] + this.corner1()[1]) / 2;

		//alert(this.angle);
		this.angle += dAngle;
		//alert(this.angle);

		let X2 = (this.corner3()[0] + this.corner1()[0]) / 2;
		let Y2 = (this.corner3()[1] + this.corner1()[1]) / 2;

		this.node[0] += X1 - X2;
		this.node[1] += Y1 - Y2;
	}

	moveStraight(speed = 0) {
		this.node[0] += Math.cos(degToRad(this.angle)) * speed;
		this.node[1] += Math.sin(degToRad(this.angle)) * speed;
	}
};

let car = new Rectangle([320, 300], 75, 38, angle = 0, speed = test_speed, color = 'purple');
car.draw();
let walls = [];

document.addEventListener('keydown', function(event) {
	active_keys[event.code] = true;
});
document.addEventListener('keyup', function(event) {
	active_keys[event.code] = false;
});

let game_process = setInterval(function() {
	context.fillStyle = 'rgb(61, 61, 61)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	//car.draw('rgb(61, 61, 61)');

	car.moveStraight(test_speed);
	if ((!active_keys["KeyD"]) || (!active_keys["KeyA"])) {
		if (active_keys["KeyD"]) {
			car.rotate(test_rotate_speed);
		}
		if (active_keys["KeyA"]) {
			car.rotate(-test_rotate_speed);
		}
	}

	car.draw();

	context.fillStyle = debugColor;
	context.fillRect(car.node[0] - 3, car.node[1] - 3, 6, 6);
	context.fillRect(car.corner3()[0] - 3, car.corner3()[1] - 3, 6, 6);
	context.fillRect((car.node[0] + car.corner3()[0]) / 2 - 3, (car.node[1] + car.corner3()[1]) / 2 - 3, 6, 6);
}, 1000 / fps);
