class Babbles {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.color = 'blue';
    this.speed = Math.floor(Math.random() * 5 + 1);
    this.distance = null;
  }

  update() {
    this.y -= this.speed;

    if (this.y + this.radius < 0) {
      this.y = this.y = canvas.height + 100;
      this.x = Math.random() * canvas.width;
      this.speed = Math.floor(Math.random() * 5 + 1);
    }

    const dx = player.x - this.x;
    const dy = player.y - this.y;

    this.distance = Math.floor(Math.sqrt(dx * dx + dy * dy));

    if (this.distance < this.radius + player.radius) {
      score++;
      audioArray[Math.floor(Math.random() * 3)].play();
      this.y = canvas.height + 100;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}
