import Character from './modules/Character.js';
import Particle from './modules/Particle.js';
import Obstacle from './modules/Obstacle.js';

let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
let score = 0;
let gamespeed = 2;
const particles = [];
const particlesQuantity = 20;

canvas.width = 500;
canvas.height = 500;

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

const removeParticles = () => {};

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
  player.draw();

  requestAnimationFrame(animate);
}
animate();
