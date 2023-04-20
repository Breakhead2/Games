let canvas = document.getElementById('cnvs');
let ctx = canvas.getContext('2d');

//Buttons

let start = document.querySelector('.btn-start');
let pause = document.querySelector('.btn-pause');
let reset = document.querySelector('.btn-reset');

let myColor;

let cycles = document.getElementById('cycle');

let rules = document.querySelector('.rules');

let htp = document.querySelector('.htp');

//global

let count = 0;
let field = [];
let rows = 30;
let cols = 30;
let timer, stop;

//get Color

document.getElementById('myColor').oninput = function(){
  return myColor = this.value;
}

//Methods

htp.onclick = function(){
  rules.classList.toggle('visible');
}

function drawRect(){
  ctx.clearRect(0,0,450,450);
  ctx.fillStyle = myColor;
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      if(field[i][j] == 1){
        ctx.fillRect(j * 15, i * 15, 14, 14);
      }else{
        ctx.clearRect(j * 15, i * 15, 14, 14);
      }
    }
  }
}

function generateField(){
  for(let i = 0; i < rows; i++){
    field[i] = [];
    for(let j=0;  j < cols; j++){
      field[i][j] = 0;
    }
  }
  return field;
}

canvas.onclick = function(event){
  let x = event.offsetX;
  let y = event.offsetY;

  x = Math.floor(x / 15);
  y = Math.floor(y / 15);

  (field[y][x] == 0) ? field[y][x] = 1 : field[y][x] = 0;
  drawRect();
}

reset.onclick = function(){
  stop = clearInterval(timer);
  ctx.clearRect(0,0,450,450);
  count = 0;
  cycles.innerHTML = count;
  generateField();
}

start.onclick = function(){
  timer = setInterval(startLife,500);
}

pause.onclick = function(){
  stop = clearInterval(timer);
}

function startLife(){
  let arr = [];
  for(let i = 0; i < rows; i++){
    arr[i] = [];
    for(let j = 0; j < cols; j++){
      let neighbors = 0;
      if(field[fpm(i)-1][j] == 1) neighbors++;
      if(field[i][fpp(j)+1] == 1) neighbors++;
      if(field[fpp(i)+1][j] == 1) neighbors++;
      if(field[i][fpm(j)-1] == 1) neighbors++;
      if(field[fpm(i)-1][fpp(j)+1] == 1) neighbors++;
      if(field[fpp(i)+1][fpp(j)+1] == 1) neighbors++;
      if(field[fpp(i)+1][fpm(j)-1] == 1) neighbors++;
      if(field[fpm(i)-1][fpm(j)-1] == 1) neighbors++;

      if(neighbors < 2 || neighbors > 3){
        if(field[i][j] == 1) arr[i][j] = 0;
      }
      if(neighbors == 2){
        (field[i][j]== 1) ? arr[i][j] = 1 : arr[i][j] = 0;
      }
      if(neighbors == 3){
        (field[i][j]== 0) ? arr[i][j] = 1 : arr[i][j] = 1;
      }
    }
  }
  field = arr;
  drawRect();
  count++;
  cycles.innerHTML = count;
}

function fpm(i){
  if(i == 0){
    return rows;
  }else{
    return i;
  }
}
function fpp(i){
  if(i == 29){
    return -1;
  }else{
    return i;
  }
}

window.addEventListener('load', generateField);
