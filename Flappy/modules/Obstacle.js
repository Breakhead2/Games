class Obstacle {
  constructor(canvas, ctx, gamespeed) {
    this.ctx = ctx;
    this.gamespeed = gamespeed;
    this.x = canvas.width;
    this.top = Math.floor((Math.random() * canvas.height) / 3 + 20);
    this.bottom = Math.floor((Math.random() * canvas.height) / 3 + 20);
    this.width = 50;
    this.canvas = canvas;
    this.counted = false;
    this.color = 'hsla(' + Math.random() * 360 + ', ' + '50%, 50%, 1)';
  }
  update() {
    this.x -= this.gamespeed;
  }
  getScore(player, score) {
    if (!this.counted && this.x < player.x) {
      score++;
      this.counted = true;
    }
    return score;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = 'black';

    this.ctx.fillRect(this.x, 0, this.width, this.top);
    this.ctx.fillRect(
      this.x,
      this.canvas.height - this.bottom,
      this.width,
      this.bottom
    );
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.x, 0, this.width, this.top);
    this.ctx.strokeRect(
      this.x,
      this.canvas.height - this.bottom,
      this.width,
      this.bottom
    );
  }
}
export default Obstacle;
