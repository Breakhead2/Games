class Obstacle {
  constructor(x, y, width, height, speed, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
    this.frameX = 0;
    this.frameY = 0;
    this.randomise = Math.floor(Math.random() * 30 + 30);
    this.carType = Math.floor(Math.random() * numberOfCars);
  }
  update() {
    this.x += this.speed * gameSpeed;
    if (this.speed > 0) {
      if (this.x > canvas1.width) {
        this.x = 0 - this.width;
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    } else {
      this.frameX = 1;
      if (this.x < 0 - this.width) {
        this.x = canvas1.width + this.width;
        this.carType = Math.floor(Math.random() * numberOfCars);
      }
    }
  }
  draw() {
    if (this.type === 'turtle') {
      if (frame % this.randomise === 0) {
        if (this.frameX >= 1) this.frameX = 0;
        else this.frameX++;
      }
      ctx1.drawImage(
        turtles,
        this.frameX * 70,
        this.frameY * 70,
        70,
        70,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.type === 'log') {
      ctx1.drawImage(log, this.x, this.y, this.width, this.height);
    } else if (this.type === 'car') {
      ctx1.drawImage(
        cars,
        this.frameX * this.width,
        this.carType * this.height,
        grid * 2,
        grid,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}

function initialObstacles() {
  //lane 1
  for (let i = 0; i < 2; i++) {
    let x = i * 350;
    carsArray.push(
      new Obstacle(x, canvas1.height - grid * 2 - 20, grid * 2, grid, 1, 'car')
    );
  }
  //lane 2
  for (let i = 0; i < 2; i++) {
    let x = i * 300;
    carsArray.push(
      new Obstacle(x, canvas1.height - grid * 3 - 20, grid * 2, grid, -3, 'car')
    );
  }
  //lane 3
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    carsArray.push(
      new Obstacle(x, canvas1.height - grid * 4 - 20, grid * 2, grid, 2, 'car')
    );
  }
  //lane 4
  for (let i = 0; i < 2; i++) {
    let x = i * 400;
    logsArray.push(
      new Obstacle(x, canvas1.height - grid * 5 - 20, grid * 2, grid, -2, 'log')
    );
  }
  //lane 5
  for (let i = 0; i < 3; i++) {
    let x = i * 200;
    logsArray.push(
      new Obstacle(x, canvas1.height - grid * 6 - 20, grid, grid, 1, 'turtle')
    );
  }
}

initialObstacles();

function handeObstacles() {
  for (let cars of carsArray) {
    cars.update();
    cars.draw();
  }

  for (let log of logsArray) {
    log.update();
    log.draw();
  }

  //collisions with cars

  for (let car of carsArray) {
    if (collision(frogger, car)) {
      ctx3.drawImage(
        collisions,
        0,
        100,
        100,
        100,
        frogger.x,
        frogger.y,
        50,
        50
      );
      resetGame();
    }
    // collisision with logs/turtles
    if (frogger.y < 250 && frogger.y > 100) {
      safe = false;

      for (let log of logsArray) {
        if (collision(frogger, log)) {
          frogger.x = log.x + log.width / 2 - frogger.width / 2;
          safe = true;
        }
      }

      if (!safe) {
        for (let i = 0; i < 30; i++) {
          ripplesArray.unshift(new Particle(frogger.x, frogger.y));
        }
        resetGame();
      }
    }
  }
}
