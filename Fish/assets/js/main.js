const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 400;

let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
  click: false,
  x: canvas.width / 2,
  y: canvas.height / 2
};

canvas.addEventListener('mousemove', (e) => {
  mouse.move = true;
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
})

const player = new Player();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();

  requestAnimationFrame(animate);
}

animate();

