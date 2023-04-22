class Frogger {
  constructor() {
    this.spriteWidth = 250;
    this.spriteHeight = 250;
    this.width = this.spriteWidth / 5;
    this.height = this.spriteHeight / 5;
    this.x = canvas1.width / 2 - this.width / 2;
    this.y = canvas1.height - this.height - 40;
    this.frameX = 0;
    this.frameY = 0;
    this.moving = false;
  }
  update() {
    if (keys['KeyW'] || keys['ArrowUp']) {
      if (this.moving === false) {
        this.y -= grid;
        this.moving = true;
      }
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      if (
        this.moving === false &&
        this.y + this.height + grid < canvas1.height
      ) {
        this.y += grid;
        this.moving = true;
      }
    }
    if (keys['KeyA'] || keys['ArrowLeft']) {
      if (this.moving === false && this.x - grid > 0) {
        this.x -= grid;
        this.moving = true;
      }
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      if (this.moving === false && this.x + this.width + grid < canvas1.width) {
        this.x += grid;
        this.moving = true;
      }
    }
    if (this.y < 0) scored();
  }
  draw() {
    ctx3.fillStyle = 'green';
    ctx3.fillRect(this.x, this.y, this.width, this.height);
  }
  jump() {
    // console.log('jump');
  }
}

const frogger = new Frogger();
