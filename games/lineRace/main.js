let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
canvas.width = document.body.clientWidth + 15;
canvas.height = document.body.clientHeight + 15;
document.body.style.overflow = 'hidden';

function main() {
    context.fillStyle = 'rgba(51, 51, 51, 0.8)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
main();