let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const bgColor = "rgb(61, 61, 61)";
const debugColor = "#e64c0c";

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

class Rectangle {
	constructor(node, width, height, angle, color="white") {
		this.width = width;
		this.height = height;
		this.totalAngle = angle;
		this.node = node;
		this.color = color;
	}

	corner1() {
		let x1 = Math.cos(degToRad(this.totalAngle)) * this.width;
		let y1 = Math.sin(degToRad(this.totalAngle)) * this.width;
		return [this.node[0] + x1, this.node[1] + y1];
	}

	corner3() {
		let x3 = -Math.cos(degToRad(90 - this.totalAngle)) * this.height;
		let y3 = Math.sin(degToRad(90 - this.totalAngle)) * this.height;
		return [this.node[0] + x3, this.node[1] + y3];
	}

	corner2() {
		let [x1, y1] = this.corner1();
		let [x3, y3] = this.corner3();
		return [x1 + x3 - this.node[0], y1 + y3 - this.node[1]];
	}

	draw(color=this.color) {
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
	}

	rotate(dAngle) {
		//this.draw(bgColor);
		let X1 = (this.corner3()[0] + this.corner1()[0]) / 2;
		let Y1 = (this.corner3()[1] + this.corner1()[1]) / 2;
		
		//alert(this.totalAngle);
		this.totalAngle += dAngle;
		//alert(this.totalAngle);

		let X2 = (this.corner3()[0] + this.corner1()[0]) / 2;
		let Y2 = (this.corner3()[1] + this.corner1()[1]) / 2;
		
		this.node[0] += X1 - X2;
		this.node[1] += Y1 - Y2;
	}
};

let car = new Rectangle([0, 0], 5000, 5000, 0, debugColor);

setInterval(function() {
	context.fillStyle = 'rgb(61, 61, 61)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	car.rotate(1);
	car.draw();
	}, 10
);