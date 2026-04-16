class StartScene extends Phaser.Scene {
    constructor() {
        super('Start')
    }

    preload() {
        this.load.image('bg', './assets/sprites/background.png');
    }

    create() {
        this.createBackground();
    }

    createBackground() {
        this.add.image(0, 0, 'bg').setOrigin(0);
    }
}