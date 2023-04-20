//DEPENDENCIES
import Rectangle from './Classes/Rectangle.js';
import Circle from './Classes/Circle.js';

//VARIABLES
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.clientWidth;
const CANVAS_HEIGHT = canvas.clientHeight;

let lastTimeStamp = 0;
let timer = 0;
const FPS = 60;
const NEXT_FRAME = 1000 / FPS;

let score = 0;
let lives = 3;
let finishGame = false;

let BRICKS_ARR = [];
const BRICKS_COLS = 10;
const BRICKS_ROW = 14;
let bricksQuantity = 0;
const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;

const pressedKeysCode = {
  isPress: false,
  space: 'Space',
};

const mouse = {
  cordX: 0,
  cordY: 0,
  isMoved: false,
};

//CLASSES

class Paddle extends Rectangle {
  move(ball) {
    this.cordX = mouse.cordX - this.width / 2;
    if (ball.isMoved === false) {
      ball.cordX = this.cordX + this.width / 2;
    }
  }
}

class Ball extends Circle {
  constructor(speedX, speedY, ...parent) {
    super(...parent);
    this.speedX = speedX;
    this.speedY = speedY;
    this.isMoved = false;
  }

  move(paddle) {
    this.cordX += this.speedX;
    this.cordY += this.speedY;

    if (this.cordX > CANVAS_WIDTH && this.speedX > 0.0) {
      this.speedX *= -1;
    }
    if (this.cordX < 0 && this.speedX < 0.0) {
      this.speedX *= -1;
    }
    if (this.cordY > CANVAS_HEIGHT) {
      --lives;
      resetGame();
      if (lives === 0) {
        lives = 3;
        score = 0;
        generateBricksField();
        resetGame();
      }
    }
    if (this.cordY < 0) {
      this.speedY *= -1;
    }

    // hit with paddle
    if (
      this.cordX > paddle.cordX &&
      this.cordX < paddle.cordX + paddle.width &&
      this.cordY > paddle.cordY &&
      this.cordY < paddle.cordY + paddle.height
    ) {
      this.speedY *= -1;

      let cordXcenterOfPaddle = paddle.cordX + paddle.width / 2;
      let deltaX = this.cordX - cordXcenterOfPaddle;

      this.speedX = deltaX * 0.35;
    }

    //hit with brick
    if (
      this.cordX < CANVAS_WIDTH &&
      this.cordX > 0 &&
      this.cordY > 0 &&
      this.cordY < BRICK_HEIGHT * BRICKS_ROW
    ) {
      let brickCol = Math.floor(this.cordX / BRICK_WIDTH);
      let prevBrickCol = Math.floor((this.cordX - this.speedX) / BRICK_WIDTH);
      let brickRow = Math.floor(this.cordY / BRICK_HEIGHT);
      let prevBrickRow = Math.floor((this.cordY - this.speedY) / BRICK_HEIGHT);
      let brickIndex = getBrickArrayIndex(brickCol, brickRow);

      if (BRICKS_ARR[brickIndex].isHit === false) {
        BRICKS_ARR[brickIndex].isHit = true;
        bricksQuantity--;
        score += 5;
        if (brickCol !== prevBrickCol) {
          this.speedX *= -1;
        }
        if (brickRow !== prevBrickRow) {
          this.speedY *= -1;
        }
      }
    }
  }
}

class Brick extends Rectangle {
  constructor(...parents) {
    super(...parents);
    this.isHit = false;
  }
}

//game objects
const paddle = new Paddle(ctx, 300, CANVAS_HEIGHT - 15 * 2, 200, 15, 'yellow');

const ball = new Ball(
  0,
  -7,
  ctx,
  paddle.cordX + paddle.width / 2,
  paddle.cordY - 10,
  10,
  'yellow'
);

//pushing brick-object to BRICKS_ARR
function generateBricksField() {
  BRICKS_ARR = [];
  for (let row = 0; row < BRICKS_ROW; row++) {
    for (let col = 0; col < BRICKS_COLS; col++) {
      let brick = new Brick(
        ctx,
        BRICK_WIDTH * col,
        BRICK_HEIGHT * row,
        BRICK_WIDTH - BRICK_GAP,
        BRICK_HEIGHT - BRICK_GAP,
        'blue'
      );
      if (row < 3) {
        brick.isHit = true;
      }
      if (brick.isHit === false) {
        bricksQuantity++;
      }
      BRICKS_ARR.push(brick);
    }
  }
}

//mousemove on canvas
canvas.addEventListener('mousemove', (event) => {
  //information about position canvas on page and page scrolls
  let root = document.documentElement;
  let canvasPositon = canvas.getBoundingClientRect();
  mouse.cordX = event.clientX - root.scrollLeft - canvasPositon.left;
  mouse.cordY = event.clientY - root.scrollTop - canvasPositon.top;
  mouse.isMoved = true;

  // if (ball.isMoved) {
  //   ball.cordX = mouse.cordX;
  //   ball.cordY = mouse.cordY;
  //   ball.speedX = 4;
  //   ball.speedY = -4;
  // }
});

//Checking space keydown
window.addEventListener('keydown', (event) => {
  if (pressedKeysCode.space === event.code) {
    ball.isMoved = true;
    pressedKeysCode.isPress = true;
  }
});

// function reset game state
function resetGame() {
  mouse.isMoved = false;
  ball.isMoved = false;
  ball.cordX = paddle.cordX + paddle.width / 2;
  ball.cordY = paddle.cordY - ball.radius;
  ball.speedX = 0;
  ball.speedY = -5;
}

//drawText
function drawText(text, font, x, y, color) {
  ctx.font = font + 'px sans-serif';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.fill();
}

//ENGINE
function updateAll() {
  if (mouse.isMoved) {
    paddle.move(ball);
  }
  if (ball.isMoved) {
    ball.move(paddle);
  }
  if (bricksQuantity === 0) {
    alert('CONGRATULATION! YOU WIN! YOU SCORE: ' + score);
    lives = 3;
    score = 0;
    generateBricksField();
    resetGame();
  }
}

function render() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  paddle.drawRectangle();
  ball.drawCircle();

  //render bricks
  for (let i = 0; i < BRICKS_ARR.length; i++) {
    if (BRICKS_ARR[i].isHit === false) {
      BRICKS_ARR[i].drawRectangle();
    }
  }
  // drawIndexBrick();
  drawText('Score: ' + score, 16, 8, 20, 'yellow');
  drawText('Lives: ' + lives, 16, CANVAS_WIDTH - 65, 20, 'yellow');

  if (pressedKeysCode.isPress === false) {
    drawText('PRESS SPACE FOR START', 20, 275, CANVAS_HEIGHT / 2 + 50, 'white');
  }

  // if (bricksQuantity === 0) {
  //   drawText(
  //     'CONGRATULATION! YOU WIN! YOU SCORE: ' + score,
  //     20,
  //     225,
  //     CANVAS_HEIGHT / 2 + 50,
  //     'white'
  //   );
  // }
}

function gameloop(timeStamp) {
  let deltaTime = timeStamp - lastTimeStamp;
  lastTimeStamp = timeStamp;

  if (timer > NEXT_FRAME) {
    updateAll();
    render();
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(gameloop);
}
generateBricksField();
gameloop(0);

//helpful functions
function getBrickArrayIndex(col, row) {
  return BRICKS_COLS * row + col;
}

// function drawIndexBrick() {
//   let brickCol = Math.floor(mouse.cordX / BRICK_WIDTH);
//   let brickRow = Math.floor(mouse.cordY / BRICK_HEIGHT);
//   let brickIndex = getBrickArrayIndex(brickCol, brickRow);
//   ctx.fillStyle = 'white';
//   ctx.fillText(
//     brickCol + ', ' + brickRow + ':' + brickIndex,
//     mouse.cordX,
//     mouse.cordY
//   );
//   ctx.fill();
// }
