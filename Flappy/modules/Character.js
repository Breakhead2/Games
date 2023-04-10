class Character {
  constructor(canvas, ctx, hero) {
    this.angle = 0;
    this.x = 200;
    this.y = canvas.height / 2;
    this.vy = 3.5;
    this.isMove = false;
    this.canvas = canvas;
    this.ctx = ctx;
    this.weight = 1;
    this.image = hero;
    this.frame = 0;
    this.originalWidth = 719;
    this.originalHeight = 612;
    this.width = this.originalWidth / 15;
    this.height = this.originalHeight / 15;
    this.speed = 0;
  }

  draw() {
    this.speed++;
    if (this.speed % 5 === 0) {
      this.frame++;
      if (this.frame > 3) this.frame = 0;
    }
    this.ctx.drawImage(
      this.image,
      this.frame * this.originalWidth,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
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
