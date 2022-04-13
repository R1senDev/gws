let moduleLoaded = false;
let canvasConnected = false;

let canvas = null;
let ctx = null;
let updateCanvasSize = function() {};
try {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	updateCanvasSize = function() {
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
	};
	updateCanvasSize();
	canvasConnected = true;
} catch {
	console.warn('Failed to connect canvas with id="canvas". Rendering won\'t work.');
}

let devTools = {
	// Показывает на экране отладочные линии курсора
	showCursorLines: false,
	// Отобращает границы объектов
	showElementsBounds: false,
	// Отображает силы, приложенные к объектам
	showForces: true,
	// Нажать Shift+D, чтобы вывести в консоль отладочные данные
	hotkeyDebugOutput: true,
	// Выводит в консоль отладочные данные
	debugOutput: function() {
		let zeroForces = 0;
		for (let i of forces) {
			if (i.sx == i.x && i.sy == i.y) {
				zeroForces++;
			}
		}
		console.log(`Existing ${gameObjects.length} gameObjects, ${forces.length} forces (${zeroForces} can be safely removed). Details:`);
		console.log(gameObjects);
		pconsole.log(forces);
	},
};

let requirements = {
	// Не изменять вручную (используйте сеттер)
	mouseIsRequired: false,
	// Не изменять вручную (используйте сеттер)
	keyboardIsRequired: false,
	set mouse(value) {
		if (value != this.mouseIsRequired) {
			switchMouse();
		}
	},
	set keyboard(value) {
		if (value != this.keyboardIsRequred) {
			switchKeyboard();
		}
	},
};

let mouse = null;
function mouseClick(event) {
	mouse.key = event.button;
	/*mouse.sx = event.clientX;
	mouse.sy = event.clientY;*/
	for (let i of gameObjects) {
		if (event.clientX >= i.x && event.clientX <= i.x + i.w && event.clientY >= i.y && event.clientY <= i.y + i.h) {
			i.clicked = true;
			i.whenClickPos = [i.x, i.y];
			i.onclick();
		}
	}
}
function mouseMove(event) {
	mouse.pos = [event.clientX, event.clientY];
	if (mouse.key == -1) {
		mouse.sx = event.clientX;
		mouse.sy = event.clientY;
	}
	for (let i of gameObjects) {
		if (i.clicked) {
			i.x = i.whenClickPos[0] + mouse.dx;
			i.y = i.whenClickPos[1] + mouse.dy;
		}
	}
}
function mouseUp(event) {
	mouse.key = -1;
	mouse.sx = mouse.x;
	mouse.sy = mouse.y;
	for (let i of gameObjects) {
		i.nowClicked = false;
	}
}
let keyboard = null;
function keyDown(event) {
	if (event.keyCode == 68 && event.shiftKey && devTools.hotkeyConsoleOutput) {
		devTools.consoleOutput();
	}
	if (!keyboard.keys.includes(event.keyCode)) {
	keyboard.keys.push(event.keyCode);
	}
	if (event.shiftKey) {
		keyboard.shift = true;
	} else {
		keyboard.shift = false;
	}
}
function keyUp(event) {
	for (let i = 0; i < keyboard.keys.length; i++) {
		if (keyboard.keys[i] == event.keyCode) {
			for (let j = i; j < keyboard.keys.length; j++) {
				if (keyboard.keys[j] == event.keyCode) {
					for (let h = j; h < keyboard.keys.length - 1; h++) {
						keyboard.keys[h] = keyboard.keys[h + 1];
					}
				}
			}
		}
	}
}

// Переключает события мыши
function switchMouse() {
	if (mouse == null) {
		mouse = {
			key: -1,
			x: 0,
			y: 0,
			sx: 0,
			sy: 0,
			get dx() {
				return this.x - this.sx;
			},
			get dy() {
				return this.y - this.sy;
			},
			set pos(value) {
				this.x = value[0];
				this.y = value[1];
				if (this.key < 0) {
					this.sx = value[0];
					this.sy = value[1];
				}
			},
		}
		document.addEventListener('mousedown', mouseDown);
		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
	} else {
		document.removeEventListener('mousedown', mouseDown);
		document.removeEventListener('mousemove', mouseMove);
		document.removeEventListener('mouseup', mouseUp);
		mouse = null;
	}
}

function switchKeyboard() {
	if (keyboard == null) {
		keyboard = {
			keys: [],
			shift: false
		}
		document.addEventListener('keydown', keyDown);
		document.addEventListener('keyup', keyUp);
	} else {
		document.removeEventListener('keydown', keyDown);
		document.removeEventListener('keyup', keyUp);
	}
}

class Force {
	// Создает новую силу, действующую на GameObject
	constructor(gobject, x, y, delay) {
		this.linkedWith = gobject;
		this.sx = gobject.x;
		this.sy = gobject.y;
		this.x = this.sx + x;
		this.y = this.sy + y;
		let parent = this;
		this.executionInterval = setInterval(function() {
			let xOld = parent.x;
			let yOld = parent.y;
			parent.linkedWith.x = parent.x
			parent.linkedWith.y = parent.y;
			parent.x += parent.x - parent.sx;
			parent.y += parent.y - parent.sy;
			parent.sx = parent.linkedWith.x;
			parent.sy = parent.linkedWith.y;
		}, delay);
	}
	remove() {
		clearInterval(this.executionInterval);
	}
}

class EquidistantForce {
	// Создает силу, действующую на объект, изменяющуюся равноускоренно
	constructor(gobject, dir, length, delay, increment) {
		this.linkedWith = gobject;
		this.direction = dir;
		this.sx = gobject.center.x;
		this.sy = gobject.center.y;
		switch (dir) {
			case 0:
				this.x = this.sx;
				this.y = this.sy - length;
				break;
			case 1:
				this.x = this.sx + length;
				this.y = this.sy;
				break;
			case 2:
				this.x = this.sx;
				this.y = this.sy + length;
				break;
			case 3:
				this.x = this.sx - length;
				this.y = this.sy;
				break;
		}
		let parent = this;
		this.execute = function(x, y) {
			parent.linkedWith.x += x;
			parent.linkedWith.y += y;
			parent.sx += x;
			parent.sy += y;
			parent.x += x;
			parent.y += y;
		}
		this.executionInterval = setInterval(function() {
			switch (dir) {
				case 0:
					parent.execute(0, -length);
					break;
				case 1:
					parent.execute(length, 0);
					break;
				case 2:
					parent.execute(0, length);
					break;
				case 3:
					parent.execute(-length, 0);
					break;
			}
		}, delay);
		this.increaseInterval = setInterval(function() {
			switch (dir) {
				case 0:
					this.y -= increment;
					break;
				case 1:
					this.x += increment;
					break;
				case 2:
					this.y += increment;
					break;
				case 3:
					this.x -= increment;
					break;
			}
		}, delay);
	}
}
let forces = [];

class GameObject {
	// Создает прямоугольный объект
	// sprite = 'rgb(...)' или 'rgba(...)' для заполнения цветом
	// sprite = null для невидимого объекта
	// иначе sprite должен содержать путь к файлу спрайта
	constructor(x, y, w, h, sprite, draggable) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.hasCollision = true;
		this.draggable = draggable;
		this.onclick = function() {}
		this.nowClicked = false;
		this.whenClickPos = [0, 0];
		if (sprite.slice(0, 3) == 'rgb') {
			this.draw = function() {
				ctx.fillStyle = sprite;
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}
		} else {
			if (sprite == null) {
				this.draw = function() {}
			} else {
				this.sprite = new Image(this.w, this.h);
				this.sprite.src = sprite;
				this.draw = function() {
					ctx.drawImage(this.sprite, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
				}
			}
		}
	}
	// Возвращает массив всех целочисленных точек, принадлежащих объекту
	get dots() {
		let dots_ = [];
		if (this.hasCollision) {
			for (let y = this.y; y <= this.y + this.h; y++) {
				for (let x = this.x; x <= this.x + this.w; x++) {
					dots_.push([Math.round(x), Math.round(y)]);
				}
			}
		}
		return dots_;
	}
	get center() {
		return {x: Math.round((this.x + this.w) / 2), y: Math.round((this.y + this.h) / 2)};
	}
	set center(value) {
		this.x = (2 * value[0] - this.w) / 2;
		this.y = (2 * value[1] - this.h) / 2;
	}
}
let gameObjects = [];

class Fps_ {
	constructor(limiter) {
		this.value = 0;
		this.frames = 0;
		this.limit = limiter;
		setInterval(function() {
			fps.value = fps.frames;
			fps.frames = 0;
		}, 1000);
	}
	get limit() {
		return this.fpsLimit;
	}
	set limit(value) {
		this.fpsLimit = value;
		clearInterval(redrawInterval);
		var redrawInterval = setInterval(redraw, 1000 / this.fpsLimit);
	}
}
let fps = new Fps_(60);

function circle(x, y, r, color) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = color;
	ctx.stroke();
}

function redraw() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i of gameObjects) {
		i.draw();
	}

	if (devTools.showForces) {
		for (let i of forces) {
			ctx.beginPath();
			ctx.moveTo(i.sx, i.sy);
			ctx.lineTo(i.sx + (i.x - i.sx + 10), i.sy + (i.y - i.sy + 10));
			ctx.strokeStyle = 'red';
			ctx.lineWidth = 2;
			ctx.stroke();
			circle(i.x, i.y, 5, 'red');
		}
	}

	fps.frames++;
}

moduleLoaded = true;