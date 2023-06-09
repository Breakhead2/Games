class Particle {
  constructor(player, gamespeed, ctx) {
    this.x = player.x;
    this.y = player.y + player.height / 2;
    this.hue = 0;
    this.vy = Math.random() * 1 - 0.5;
    this.vx = gamespeed;
    this.ctx = ctx;
    this.radius = Math.random() * 7 + 3;
  }

  update() {
    this.x -= this.vx;
    this.y += this.vy;
    this.hue += 5;
    if (this.hue > 360) this.hue = 0;
  }

  draw() {
    this.ctx.fillStyle = 'hsla(' + this.hue + ', ' + '50%, 50%, 0.8)';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export default Particle;
