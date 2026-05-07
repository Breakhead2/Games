export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    create() {
        console.log('Preload create');
        this.add.image(0, 0, 'bg').setOrigin(0);
    }
}