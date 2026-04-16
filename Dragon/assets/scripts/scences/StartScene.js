class StartScene extends Phaser.Scene {
    constructor() {
        super('Start')
    }

    preload() {
        console.log('Start.scene preload');
    }

    create() {
        console.log('Start.scene create');
        this.createBackground();
    }

    createBackground() {
        this.add.image(0, 0, 'bg').setOrigin(0);
    }
}