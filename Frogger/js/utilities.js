function animate() {
  ctx3.clearRect(0, 0, canvas1.clientWidth, canvas1.height);
  frogger.update();
  frogger.draw();

  requestAnimationFrame(animate);
}

animate();

//event listeners

window.addEventListener('keydown', (e) => {
  keys = [];
  keys[e.code] = true; // associative array [key:value]
});
