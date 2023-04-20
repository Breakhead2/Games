class Circle {
  constructor(ctx, cordX, cordY, radius, color) {
    this.ctx = ctx;
    this.cordX = cordX;
    this.cordY = cordY;
    this.radius = radius;
    this.color = color;
  }

  drawCircle() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.cordX, this.cordY, this.radius, 0, Math.PI * 2, true);
    this.ctx.fill();
  }
}

export default Circle;
