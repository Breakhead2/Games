import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.scale;
        
        // Адаптивный заголовок
        const title = this.add.text(width / 2, height * 0.3, 'FLAPPY BIRD', {
            fontSize: `${Math.min(width * 0.08, 64)}px`,
            fill: '#fff',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        // Адаптивная инструкция
        const instruction = this.add.text(width / 2, height * 0.6, 'Tap anywhere to start', {
            fontSize: `${Math.min(width * 0.04, 28)}px`,
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Анимация мигания для инструкции
        this.tweens.add({
            targets: instruction,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
        
        // Управление: клик или тап в любом месте
        this.input.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}