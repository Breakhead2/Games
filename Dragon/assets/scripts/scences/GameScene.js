class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.bgSpeed = 50;
    }

    create() {
        this.createBackground();
        this.player = new Player(this, 150, config.height / 2, 'dragon', 'dragon1', 500);  
        this.enemy = new Enemy(this, config.width, config.height / 2, 'enemy', 'enemy1', 250);       
    }

    update(time, delta) {
        this.bg.tilePositionX += this.bgSpeed * (delta / 1000);
        this.player.move();
        this.enemy.move();
    }

    createBackground() {
        this.bg = this.add
         .tileSprite(-0.1, 0, config.width, config.height, 'bg')
        .setOrigin(0);
    }
}