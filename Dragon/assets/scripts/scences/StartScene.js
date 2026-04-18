class StartScene extends Phaser.Scene {
    constructor() {
        super('Start')
    }

    preload() {
        //
    }

    create() {
        this.createBackground();
        this.createText();
        this.screenOnClick();
    }

    createBackground() {
        this.add.image(0, 0, 'bg').setOrigin(0);
    }

    createText() {
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height - this.sys.game.config.height / 3, 
            'Tap to Start',
            {
                fontFamily: 'Mabook',
                fontSize: '72px',
                color: "#000000"
            }
        )
        .setOrigin(0.5);
    }

    screenOnClick() {
        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}