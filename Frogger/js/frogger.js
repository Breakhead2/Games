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
        this.frameY = 0;
        this.frameX = 1;
      }
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      if (
        this.moving === false &&
        this.y + this.height + grid < canvas1.height
      ) {
        this.y += grid;
        this.moving = true;
        this.frameY = 3;
      }
    }
    if (keys['KeyA'] || keys['ArrowLeft']) {
      if (this.moving === false && this.x - grid > 0) {
        this.x -= grid;
        this.moving = true;
        this.frameY = 2;
      }
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      if (this.moving === false && this.x + this.width + grid < canvas1.width) {
        this.x += grid;
        this.moving = true;
        this.frameY = 1;
      }
    }
    if (this.y < 0) scored();
  }
  draw() {
    ctx3.drawImage(
      froggerImage,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 25,
      this.y - 25,
      this.width * 2,
      this.height * 2
    );
  }
  jump() {
    if (this.moving === false) this.frameX = 1;
    else if (this.frameX === 1) this.frameX = 0;
  }
}

const frogger = new Frogger();
