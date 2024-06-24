class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.angle = 0;
    this.radius = 50;
    this.frameX = 0;
    this.frame = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    if (mouse.x !== this.x) {
      this.x -= dx/20;
    }

    if (mouse.y !== this.y) {
      this.y -= dy/20;
    }
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}