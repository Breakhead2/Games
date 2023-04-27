class Particle {
  constructor(x, y) {
    this.x = x + 25;
    this.y = y + 25;
    this.radius = Math.floor(Math.random() * 19 + 1);
    this.opacity = 1;
    this.directionX = Math.random() * 2 - 0.5;
    this.directionY = Math.random() * 2 - 0.5;
  }
  draw() {
    this.opacity -= 0.03;
    if (this.opacity < 0) this.opacity = 0;
    ctx3.fillStyle = 'rgba(150, 150, 150, ' + this.opacity + ')';
    ctx3.beginPath();
    ctx3.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx3.fill();
    ctx3.closePath();
  }
  update() {
    this.x += this.directionX;
    this.y += this.directionY;
  }
  drawRipples() {
    ctx3.strokeStyle = 'white';
    ctx3.beginPath();
    if (this.radius < 30) {
      this.radius += 0.5;
    }
    ctx3.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx3.stroke();
    ctx3.closePath();
  }
}

function handleParticles() {
  for (let particle of particlesArray) {
    if (frogger.y > 200) {
      particle.update();
      particle.draw();
    }
  }
  if (particlesArray.length > maxParticles) {
    for (let i = 0; i < 30; i++) {
      particlesArray.pop();
    }
  }
  if (
    (keys['KeyA'] ||
      keys['KeyW'] ||
      keys['KeyD'] ||
      keys['KeyS'] ||
      keys['ArrowLeft'] ||
      keys['ArrowUp'] ||
      keys['ArrowRight'] ||
      keys['ArrowDown']) &&
    frogger.y > 200 &&
    particlesArray.length < maxParticles + 10
  ) {
    for (let i = 0; i < 10; i++) {
      particlesArray.unshift(new Particle(frogger.x, frogger.y));
    }
  }
}
