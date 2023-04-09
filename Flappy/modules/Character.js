class Character {
  constructor(canvas, ctx) {
    this.angle = 0;
    this.x = 200;
    this.y = canvas.height / 2;
    this.vy = 5;
    this.width = 20;
    this.height = 20;
    this.isMove = false;
    this.canvas = canvas;
    this.ctx = ctx;
    this.weight = 1;
  }

  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.angle += 0.12;
    let curve = Math.sin(this.angle) * 20;
    if (this.y > this.canvas.height - 3 * this.height + curve) {
      this.y = this.canvas.height - 3 * this.height + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 2 * this.height) {
      this.y = 2 * this.height;
      this.vy = 0;
    }
    if (this.isMove && this.y > 3 * this.height) this.flap();
  }

  flap() {
    this.vy -= 2;
  }
}

export default Character;
