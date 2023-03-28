class Character {
  constructor(canvas, ctx) {
    this.angle = 0;
    this.x = 90;
    this.y = canvas.height / 2;
    this.vy = 3.5;
    this.width = 30;
    this.height = 30;
    this.isMove = false;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.angle += 0.12;
    let amplitude = 50;

    let curve = Math.sin(this.angle) * 20 + amplitude;
    this.y = curve;
  }
}

export default Character;
