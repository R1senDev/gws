let lineNow = 1;
let devTools = {
	showBorders: false,
	showCursorPath: false,
};

document.body.style.overflow = 'hidden';

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let mouthPos = [Math.round(canvas.width / 2), Math.round(canvas.height / 3 * 2)];
let eyePos = [
	[Math.round(canvas.width / 3), Math.round(canvas.height / 3)],
	[Math.round(canvas.width / 3 * 2), Math.round(canvas.height / 3)]
];

function updateCanvasSize() {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight + 50;
	mouthPos = [Math.round(canvas.width / 2), Math.round(canvas.height / 3 * 2)];
	eyePos = [
		[Math.round(canvas.width / 3 - 50), Math.round(canvas.height / 3)],
		[Math.round(canvas.width / 3 * 2 + 50), Math.round(canvas.height / 3)]
	];
}
updateCanvasSize();

let sprites = {
	left: {
		eye: {
			angry: new Image(134, 112),
			chilling: new Image(134, 18),
			happy: new Image(164, 126),
			idle: new Image(134, 134),
			winking: new Image(127, 61),
		},
		cheek: new Map([
			[1, new Image(82, 90)],
			[2, new Image(85, 100)],
			[3, new Image(93, 116)],
			[4, new Image(96, 120)],
			[5, new Image(101, 130)],
			[6, new Image(105, 136)],
			[7, new Image(109, 142)],
			[8, new Image(114, 146)],
		]),
	},
	right: {
		eye: {
			angry: new Image(134, 112),
			chilling: new Image(134, 18),
			happy: new Image(164, 126),
			idle: new Image(134, 134),
			winking: new Image(127, 61),
		},
		cheek: new Map([
			[1, new Image(82, 90)],
			[2, new Image(85, 100)],
			[3, new Image(93, 116)],
			[4, new Image(96, 120)],
			[5, new Image(101, 130)],
			[6, new Image(105, 136)],
			[7, new Image(109, 142)],
			[8, new Image(114, 146)],
		]),
	},
	mouth: {
		angry: new Image(136, 79),
		chilling: new Image(147, 52),
		happy: new Image(146, 128),
		smiling: new Image(135, 84),
		staggered: new Image(102, 137),
		surprised: new Image(94, 17),
	},
	back: new Image(636, 61),
};

sprites.left.eye.angry.src = 'left/eye/angry.png';
sprites.left.eye.chilling.src = 'left/eye/chilling.png';
sprites.left.eye.happy.src = 'left/eye/happy.png';
sprites.left.eye.idle.src = 'left/eye/idle.png';
sprites.left.eye.winking.src = 'left/eye/winking.png';

sprites.right.eye.angry.src = 'right/eye/angry.png';
sprites.right.eye.chilling.src = 'right/eye/chilling.png';
sprites.right.eye.happy.src = 'right/eye/happy.png';
sprites.right.eye.idle.src = 'right/eye/idle.png';
sprites.right.eye.winking.src = 'right/eye/winking.png';
let currentEyesState = 'idle';
function currentEyeSprite(side) {
	if (side == 'left') {
		switch (currentEyesState) {
			case 'angry':
				return sprites.left.eye.angry;
			case 'chilling':
				return sprites.left.eye.chilling;
			case 'happy':
				return sprites.left.eye.happy;
			case 'idle':
				return sprites.left.eye.idle;
			case 'winking':
				return sprites.left.eye.winking;
		}
	} else {
		switch (currentEyesState) {
			case 'angry':
				return sprites.right.eye.angry;
			case 'chilling':
				return sprites.right.eye.chilling;
			case 'happy':
				return sprites.right.eye.happy;
			case 'idle':
				return sprites.right.eye.idle;
			case 'winking':
				return sprites.right.eye.winking;
		}
	}
}

sprites.left.cheek.get(1).src = 'left/cheek/1.png';
sprites.left.cheek.get(2).src = 'left/cheek/2.png';
sprites.left.cheek.get(3).src = 'left/cheek/3.png';
sprites.left.cheek.get(4).src = 'left/cheek/4.png';
sprites.left.cheek.get(5).src = 'left/cheek/5.png';
sprites.left.cheek.get(6).src = 'left/cheek/6.png';
sprites.left.cheek.get(7).src = 'left/cheek/7.png';
sprites.left.cheek.get(8).src = 'left/cheek/8.png';

sprites.right.cheek.get(1).src = 'right/cheek/1.png';
sprites.right.cheek.get(2).src = 'right/cheek/2.png';
sprites.right.cheek.get(3).src = 'right/cheek/3.png';
sprites.right.cheek.get(4).src = 'right/cheek/4.png';
sprites.right.cheek.get(5).src = 'right/cheek/5.png';
sprites.right.cheek.get(6).src = 'right/cheek/6.png';
sprites.right.cheek.get(7).src = 'right/cheek/7.png';
sprites.right.cheek.get(8).src = 'right/cheek/8.png';

sprites.mouth.angry.src = 'mouth/angry.png';
sprites.mouth.chilling.src = 'mouth/chilling.png';
sprites.mouth.happy.src = 'mouth/happy.png';
sprites.mouth.smiling.src = 'mouth/smiling.png';
sprites.mouth.staggered.src = 'mouth/staggered.png';
sprites.mouth.surprised.src = 'mouth/surprised.png';
let currentMouthState = 'smiling';
function currentMouthSprite() {
	switch (currentMouthState) {
		case 'angry':
			return sprites.mouth.angry;
		case 'chilling':
			return sprites.mouth.chilling;
		case 'happy':
			return sprites.mouth.happy;
		case 'smiling':
			return sprites.mouth.smiling;
		case 'staggered':
			return sprites.mouth.staggered;
		case 'surprised':
			return sprites.mouth.surprised;
	}
}

sprites.back.src = 'backText.png';

function fillCircle(x, y, r, color) {
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = color;
	context.stroke();
}

function drawByCenter(img, x, y) {
	context.drawImage(img, x - Math.round(img.width / 2), y - Math.round(img.height / 2), img.width, img.height);
}

function fillBg() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}
fillBg();

function redraw() {
	fillBg();

	drawByCenter(currentEyeSprite('left'), eyePos[0][0], eyePos[0][1]);
	drawByCenter(currentEyeSprite('right'), eyePos[1][0], eyePos[1][1]);
	drawByCenter(currentMouthSprite(), mouthPos[0], mouthPos[1]);

	context.drawImage(sprites.back, 0, 0, sprites.back.width / 2, sprites.back.height / 2);

	if (devTools.showCursorPath) {
		fillCircle(mouse.sx, mouse.sy, 5, 'red');
		context.beginPath();
		context.moveTo(mouse.sx, mouse.sy);
		context.lineTo(mouse.x, mouse.y);
		context.strokeStyle = 'red';
		context.lineWidth = 2;
		context.stroke();
	}
}

let mouse = {
	key: null,
	x: 0,
	y: 0,
	sx: 0,
	sy: 0,
	cheekSx: 0,
	cheekSy: 0,
	get dx() {
		return this.x - this.sx;
	},
	get dy() {
		return this.y - this.sy;
	},
};

let keys = {
	pressed: [],
};
document.addEventListener('keydown', function(event) {
	if (!keys.pressed.includes(event.keyCode)) {
		keys.pressed.push(event.keyCode);
	}
});
document.addEventListener('keyup', function(event) {
	keys.pressed = [];
});
document.addEventListener('mousedown', function(event) {
	mouse.sx = event.clientX;
	mouse.sy = event.clientY;
	mouse.key = event.button;
	if (mouse.x <= sprites.back.width / 2 && mouse.y <= sprites.back.height / 2) {
		this.location.href = '../../index.html';
	}
});
document.addEventListener('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	if (mouse.key == null) {
		mouse.sx = mouse.x;
		mouse.sy = mouse.y;
	}
	if (mouse.x <= sprites.back.width / 2 && mouse.y <= sprites.back.height / 2) {
		canvas.style.cursor = 'pointer';
	} else {
		canvas.style.cursor = 'auto';
	}
});
document.addEventListener('mouseup', function(event) {
	mouse.key = null;
});

setInterval(function() {
	redraw();
}, 3);

let delay = 0;
setInterval(function() {
	delay = Math.floor(Math.random() * 3001 + 1000);
	setTimeout(function() {
		let previousEyesState = 'idle';
		if (currentEyesState == 'winking') {
			previousEyesState = 'idle';
		} else {
			previousEyesState = currentEyesState;
		}
		currentEyesState = 'winking';
		setTimeout(function() {
			currentEyesState = previousEyesState;
		}, 100);
	}, delay);
}, delay + 1000);

window.onload = function() {};

window.addEventListener('resize', updateCanvasSize);