class PreloadScene extends Phaser.Scene {
    //loader
    constructor() {
        super('Preload');
    }

    preload() {
        console.log('Preload.preload assets');
    }

    create() {
        console.log('Preload.create');
        this.scene.start('Start');
    }
}