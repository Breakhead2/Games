const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const backgroundImg = new Image();
backgroundImg.src = './tattooine-game-background.png';

const enemiesFrames = [
  'sith',
  'stormtrooper',
  'darthvader',
  'darthmaul',
  'darthsidious',
  'sith2',
];

const FPS = 30;
const NEXT_FRAME = 1000 / FPS;
let timer = 0;
let lastTimestamp = 0;

let score = 0;

const heroImg = new Image();
heroImg.src = 'mandalorian.png';

const sithImg = new Image();
sithImg.src = './enemies/sith.png';

const stormtrooperImg = new Image();
stormtrooperImg.src = './enemies/stormtrooper.png';

const darthvaderImg = new Image();
darthvaderImg.src = './enemies/darthvader.png';

const darthmaulImg = new Image();
darthmaulImg.src = './enemies/darthmaul.png';

const darthsidiousImg = new Image();
darthsidiousImg.src = './enemies/darthsidious.png';

const sith2Img = new Image();
sith2Img.src = './enemies/sith2.png';

const explImg = new Image();
explImg.src = './explousion.png';

const enemyFrames = {
  sith: sithImg,
  stormtrooper: stormtrooperImg,
  darthvader: darthvaderImg,
  darthmaul: darthmaulImg,
  darthsidious: darthsidiousImg,
  sith2: sith2Img,
};

const keys = {
  KeyW: false,
  KeyS: false,
  KeyA: false,
  KeyD: false,
};

const enemies = [];
const enemiesQuantity = 10;

const explousions = [];

class Exp {
  constructor(x, y, index) {
    this.img = explImg;
    this.width = 32;
    this.height = 32;
    this.frameX = 0;
    this.frameY = 0;
    this.x = x;
    this.y = y;
    this.cicle = 0;
    this.index = index;
  }

  drawOrRemove() {
    if (this.cicle < 3) {
      if (this.frameX < 3) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }

      ctx.drawImage(
        this.img,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );

      this.cicle += 0.5;
    } else {
      explousions.splice(this.index, 1);
    }
  }
}

class Hero {
  constructor(image, x, y, frameX, frameY, speedX, speedY) {
    this.img = image;
    this.width = 32;
    this.height = 48;
    this.x = x;
    this.y = y;
    this.frameX = frameX;
    this.frameY = frameY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.isMove = false;
  }
  draw() {
    if (this.isMove) {
      if (keys.KeyW) {
        this.frameY = 3;
      }
      if (keys.KeyS) {
        this.frameY = 0;
      }
      if (keys.KeyA) {
        this.frameY = 1;
      }
      if (keys.KeyD) {
        this.frameY = 2;
      }
      if (this.frameX < 3) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }

    ctx.drawImage(
      this.img,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  move() {
    if (keys.KeyW && this.y > 100) {
      this.y -= this.speedY;
      this.isMove = true;
    }
    if (keys.KeyS && this.y < canvas.height - this.height) {
      this.y += this.speedY;
      this.isMove = true;
    }
    if (keys.KeyA && this.x > 0) {
      this.x -= this.speedX;
      this.isMove = true;
    }
    if (keys.KeyD && this.x < canvas.width - this.width) {
      this.x += this.speedX;
      this.isMove = true;
    }
  }

  hitEnemy(enemy, index) {
    if (
      this.x + this.width / 2 > enemy.x &&
      this.x + this.width / 2 < enemy.x + enemy.width &&
      this.y + this.height / 2 > enemy.y &&
      this.y + this.height / 2 < enemy.y + enemy.height
    ) {
      score++;
      enemies.splice(index, 1);
      enemies.push(
        new Enemy(
          randomEnemy(),
          canvas.width + 32,
          Math.random() * (canvas.height - 148) + 100,
          0,
          1,
          Math.random() * 3 + 3,
          Math.random() * 3 + 3
        )
      );

      explousions.push(new Exp(enemy.x, enemy.y));
    }
  }
}

class Enemy extends Hero {
  draw() {
    if (this.frameX < 3) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }

    ctx.drawImage(
      this.img,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  move() {
    this.x -= this.speedX;
    if (this.x < 0 - this.width) {
      if (score > 0) {
        score--;
      } else {
        score = 0;
      }
      this.x = canvas.width + this.width;
      this.y = Math.random() * (canvas.height - this.height) + 100;

      this.speedX = Math.random() * 3 + 3;
    }
  }
}

const hero = new Hero(heroImg, 200, 200, 0, 2, 9, 9);

function generateEnemies() {
  for (let i = 0; i < enemiesQuantity; i++) {
    const enemy = new Enemy(
      randomEnemy(),
      canvas.width + 32,
      Math.random() * (canvas.height - 148) + 100,
      0,
      1,
      Math.random() * 3 + 3,
      Math.random() * 3 + 3
    );
    enemies.push(enemy);
  }
}

function drawText(text, font, x, y, color) {
  ctx.font = font + 'px sans-serif';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.fill();
}

function randomEnemy() {
  let index = Math.floor(Math.random() * enemiesFrames.length);
  return enemyFrames[enemiesFrames[index]];
}

window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  hero.isMove = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
  hero.isMove = false;
});

function game(timestamp) {
  let deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  if (timer > NEXT_FRAME) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.fillText(`SCORE: `, 110, 0);
    drawText('SCORE: ' + score, 22, 680, 30, 'black');

    for (let i = 0; i < enemies.length; i++) {
      hero.hitEnemy(enemies[i], i);
      enemies[i].draw();
      enemies[i].move();
    }

    for (let i = 0; i < explousions.length; i++) {
      explousions[i].drawOrRemove();
    }

    hero.draw();
    hero.move();

    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(game);
}

generateEnemies();
game(0);
