//obstacles and background
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = 600;
canvas1.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = 600;
canvas2.height = 600;

//frogger
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById('canvas5');
const ctx4 = canvas4.getContext('2d');
canvas4.width = 600;
canvas4.height = 600;

//global variables

const grid = 80;
let frame = 0;
let score = 0;
let gameSpeed = 1;
let keys = [];
let collisionCount = 0;
let safe = false;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];

//images
const background_lvl2 = new Image();
background_lvl2.src = './images/background_lvl2.png';

const grass = new Image();
grass.scr = './images/grass.png';

const collisions = new Image();
collisions.src = './images/collisions.png';

const turtles = new Image();
turtles.src = './images/turtles.png';

const log = new Image();
log.src = './images/log.png';

const cars = new Image();
cars.src = './images/cars.png';
let numberOfCars = 3;

const froggerImage = new Image();
froggerImage.src = './images/frog_spritesheet.png';
