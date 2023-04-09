import Character from './modules/Character.js';
import Particle from './modules/Particle.js';
import Obstacle from './modules/Obstacle.js';

let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
let score = 0;
let gamespeed = 2;
let frame = 0;
const particles = [];
const obstacles = [];

canvas.width = 600;
canvas.height = 400;

const player = new Character(canvas, ctx);

const pushParticles = () => {
  particles.unshift(new Particle(player, gamespeed, ctx));
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].x < 0) {
      particles.splice(i, 1);
    }
  }
};

const handleObstacles = () => {
  frame++;
  if (frame % 80 === 0) {
    obstacles.unshift(new Obstacle(canvas, ctx, gamespeed));
    frame = 0;
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
    score = obstacles[i].getScore(player, score);
    obstacles[i].draw();

    if (obstacles[i].x < 0 - obstacles[i].width) obstacles.splice(i, 1);
  }
};

const checkCollusion = () => {
  for (let i = 0; i < obstacles.length; i++) {
    if (
      player.x + player.width > obstacles[i].x &&
      player.x < obstacles[i].x + obstacles[i].width
    ) {
      if (
        player.y < obstacles[i].top ||
        player.y > canvas.height - obstacles[i].bottom
      ) {
        ctx.font = '30px Georgia';
        ctx.fillStyle = 'black';
        ctx.fillText('Game is over', 200, canvas.height / 2);
        return true;
      }
    }
  }
  return false;
};

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') player.isMove = true;
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') player.isMove = false;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update();
  pushParticles();
  handleObstacles();
  player.draw();
  ctx.font = '75px Georgia';
  ctx.fillStyle = 'black';
  ctx.fillText(score, 450, 50);
  if (checkCollusion()) return;
  requestAnimationFrame(animate);
}
animate();
