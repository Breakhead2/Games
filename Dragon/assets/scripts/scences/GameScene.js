class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        console.log('Game.scene preload');
    }

    create() {
        console.log('Game.scene create');
        this.createBackground();
    }

    createBackground() {
        this.add.image(0, 0, 'bg').setOrigin(0);
    }
}