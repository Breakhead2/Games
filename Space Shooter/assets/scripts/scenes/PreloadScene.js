import { BaseScene } from "./BaseScene.js";

export class PreloadScene extends BaseScene {
    constructor() {
        super('Preload');
    }

    preload() {
        this.load.image('ship', './assets/sprites/ship.png');

        //sounds
        this.load.audio('menu', './assets/sounds/menu.mp3');
        this.load.audio('game', './assets/sounds/game.ogg');
        this.createBackground();
        this.createLoadBar();
    }

    create() {
        // super.create();
    }

    createLoadBar() {
        const loaderY = this.sys.game.config.height - 150;
        const loaderWidth = this.sys.game.config.width - 2 * this.padding;

        const barBackground = this.add.rectangle(this.centerX, loaderY, loaderWidth, 30, 0x111122);
        barBackground.setStrokeStyle(2, 0x00ffff);

        this.loaderFill = this.add.rectangle(this.centerX - loaderWidth / 2 + 2, loaderY, 0, 24, 0x00ff66);
        this.loaderFill.setOrigin(0, 0.5);

        this.percentText = this.add.text(
            this.centerX,
            loaderY - 35,
            '0%',
            {
                fontSize: '28px',
                fill: '#ffffff',
                fontFamily: 'monospace',
                fontWeight: 'bold'
            }
        ).setOrigin(0.5);

        this.load.on('progress', (value) => {
            const percent = Math.floor(value * 100);
            this.percentText.setText(`${percent}%`);
            
            this.loaderFill.width = (loaderWidth - 2) * value;
            
            let color;
            if (value < 0.3) {
                color = 0x00ff66;
            } else if (value < 0.7) {
                color = 0xffaa00;
            } else {
                color = 0xff3366;
            }
            this.loaderFill.fillColor = color;
        });
        
        this.load.on('complete', () => {
            this.percentText.setText('100%');
            this.loaderFill.width = loaderWidth - 2;
            
            this.goToMenuScene();
        });
    }
}