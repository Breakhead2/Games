class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {        
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    preload() {
    }

    create() {
        this.createBackground();
        this.player = new Player(this);         
    }

    update() {
        this.player.move();
    }

    createBackground() {
        this.add.image(0, 0, 'bg').setOrigin(0);
    }
}