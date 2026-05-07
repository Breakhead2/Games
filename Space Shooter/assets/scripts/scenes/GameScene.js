import { BaseScene } from "./BaseScene.js";

export class GameScene extends BaseScene {
    constructor() {
        super('Game');
    }

    create() {
        super.createBackground();
        this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height - 100, 'ship').setDisplaySize(100, 100);
    }
}