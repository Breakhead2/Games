import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        const { width, height } = this.scale;
        
        // Адаптивный текст
        this.add.text(width / 2, height * 0.3, 'GAME SCENE', {
            fontSize: `${Math.min(width * 0.08, 48)}px`,
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        this.add.text(width / 2, height * 0.5, 'Tap = Jump', {
            fontSize: `${Math.min(width * 0.05, 32)}px`,
            fill: '#ffff00',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        // Управление: тап = прыжок (пока просто лог)
        this.input.on('pointerdown', () => {
            console.log('Jump! (скоро будет)');
        });
        
        // Временный выход в меню (для теста)
        this.time.delayedCall(3000, () => {
            this.scene.start('MenuScene');
        });
    }
}