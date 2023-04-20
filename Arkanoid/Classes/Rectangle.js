class Rectangle {
  constructor(ctx, cordX, cordY, width, height, color) {
    this.ctx = ctx;
    this.cordX = cordX;
    this.cordY = cordY;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  drawRectangle() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.cordX, this.cordY, this.width, this.height);
  }
}

export default Rectangle;
