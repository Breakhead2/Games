import { BaseScene } from "./BaseScene.js";

export class StartScene extends BaseScene {
    constructor() {
        super('Start');
    }

    create() {
        super.create();

        this.input.keyboard.once('keyup-ENTER', this.startGame, this);
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'bg').setOrigin(0);
    }

    createText() {
        super.createText();

        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Press ENTER to start', {
            fontFamily: 'PressStart2P',
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }

    startGame() {
        this.scene.start('Game');
    }
}