class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.angle = 0;
    this.radius = 50;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    if (mouse.x !== this.x) {
      this.x -= dx / 20;
    }

    if (mouse.y !== this.y) {
      this.y -= dy / 20;
    }

    this.angle = Math.atan2(dy, dx);
  }

  draw() {
    if (mouse.click) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'green';
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    if (this.x >= mouse.x) {
      ctx.drawImage(
        playerImage,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - this.radius,
        0 - this.radius,
        this.spriteWidth / 4,
        this.spriteHeight / 4
      );
    } else {
      ctx.drawImage(
        playerLeftImage,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - this.radius,
        0 - this.radius,
        this.spriteWidth / 4,
        this.spriteHeight / 4
      );
    }

    ctx.restore();
  }
}
