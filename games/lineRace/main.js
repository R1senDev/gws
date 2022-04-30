let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = document.body.clientWidth + 15;
    canvas.height = document.body.clientHeight + 25;
}
resizeCanvas();

context.fillStyle = 'rgba(51, 51, 51, 0.8)';
context.fillRect(0, 0, canvas.width, canvas.height);