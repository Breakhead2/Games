const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 400;

let canvasPosition = canvas.getBoundingClientRect();
let bubblesArray = [];
let bubblesQuantity = 5;
let score = 0;

const playerImage = new Image();
playerImage.src = './assets/images/__cartoon_fish_06_green_swim.png';

const playerLeftImage = new Image();
playerLeftImage.src = './assets/images/output-onlinepngtools.png';

const audio = new Audio();
audio.src = './assets/audio/pop1.ogg';

const audio2 = new Audio();
audio2.src = './assets/audio/pop2.ogg';

const audio3 = new Audio();
audio3.src = './assets/audio/pop3.ogg';

const audioArray = [audio, audio2, audio3];

const mouse = {
  click: false,
  x: canvas.width / 2,
  y: canvas.height / 2,
};

canvas.addEventListener('mousedown', (e) => {
  mouse.click = true;
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('mouseup', () => {
  mouse.click = false;
});

const player = new Player();

for (let i = 0; i < bubblesQuantity; i++) {
  bubblesArray.push(new Babbles());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Verdana';
  ctx.fillStyle = 'black';
  ctx.fillText('SCORE: ' + score, 15, 30);

  for (let bubble of bubblesArray) {
    bubble.update();
    bubble.draw();
  }

  player.update();
  player.draw();

  requestAnimationFrame(animate);
}

animate();
