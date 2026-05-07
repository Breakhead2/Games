export class BaseScene extends Phaser.Scene {
    constructor(scene) {
        super(scene)
    }

    init() {
        this.bgSpeed = 60;
    }

    create() {
        this.createBackground();
        this.createText();
    }

    update(time, delta) {
        this.bg.tilePositionY -= this.bgSpeed * (delta / 1000);
    }

    createText() {
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 3, 'SPACE SHOOTER', {
            fontFamily: 'PressStart2P',
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'bg').setOrigin(0);
    }
}