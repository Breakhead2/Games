import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
       this.add.image(0, 0, 'bg').setOrigin(0);
    }
}