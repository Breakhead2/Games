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
        this.player = new Player(this);
        this.enemies = new Enemies(this);
        this.enemies.createEnemy(); 
    }

    update(time, delta) {
        this.bg.tilePositionX += this.bgSpeed * (delta / 1000);
        this.player.move();
    }

    createBackground() {
        this.bg = this.add
         .tileSprite(-0.1, 0, config.width, config.height, 'bg')
        .setOrigin(0);
    }
}