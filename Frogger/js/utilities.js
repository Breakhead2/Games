function animate() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx1.drawImage(background_lvl2, 0, 0, canvas1.width, canvas1.height);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  frogger.update();
  frogger.draw();
  // handeObstacles();
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
});

function scored() {
  score++;
  gameSpeed += 0.05;
  frogger.x = canvas1.width / 2 - frogger.width / 2;
  frogger.y = canvas1.height - frogger.height - 40;
}
