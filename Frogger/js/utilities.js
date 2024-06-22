function animate() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  ctx1.drawImage(background_lvl2, 0, 0, canvas1.width, canvas1.height);

  handleParticles();
  frogger.update();
  frogger.draw();
  handeObstacles();
  handleScoreBoard();
  frame++;
  requestAnimationFrame(animate);
}

animate();

//event listeners

window.addEventListener('keydown', (e) => {
  keys = [];
  keys[e.code] = true; // associative array [key:value]

  if (
    keys['KeyA'] ||
    keys['KeyW'] ||
    keys['KeyD'] ||
    keys['KeyS'] ||
    keys['ArrowLeft'] ||
    keys['ArrowUp'] ||
    keys['ArrowRight'] ||
    keys['ArrowDown']
  ) {
    frogger.jump();
  }
});

window.addEventListener('keyup', (e) => {
  delete keys[e.code];
  frogger.moving = false;
  frogger.frameX = 0;
});

function scored() {
  score++;
  gameSpeed += 0.25;
  frogger.x = canvas1.width / 2 - frogger.width / 2;
  frogger.y = canvas1.height - frogger.height - 40;
}

function handleScoreBoard() {
  ctx1.fillStyle = 'black';
  ctx1.strokeStyle = 'black';
  ctx1.font = '15px Verdana';
  ctx1.strokeText('Score', 265, 15);
  ctx1.font = '60px Verdana';
  ctx1.fillText(score, 270, 65);
  ctx1.font = '15px Verdana';
  ctx1.strokeText('Collisions: ' + collisionCount, 10, 175);
  ctx1.strokeText('Game Speed: ' + gameSpeed.toFixed(1), 10, 195);
}

//collision detection between two rectangles
function collision(first, second) {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
}

function resetGame() {
  frogger.x = canvas1.width / 2 - frogger.width / 2;
  frogger.y = canvas1.height - frogger.height - 40;
  score = 0;
  collisionCount++;
  gameSpeed = 1;
}
