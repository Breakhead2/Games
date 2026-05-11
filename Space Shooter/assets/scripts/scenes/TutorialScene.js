import { BaseScene } from "./BaseScene.js";

export class TutorialScene extends BaseScene {
    constructor() {
        super('Tutorial');
    }

    create() {
        // Сначала создаем фон
        this.createBackground();
        
        // Создаем кнопку назад и другой контент
        this.createBackButton();
        
        // Добавляем текст туториала
        this.add.text(this.centerX, this.centerY - 100, 'HOW TO PLAY', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        this.add.text(this.centerX, this.centerY, 'Use arrow keys to move\nPress SPACE to shoot', {
            fontSize: '24px',
            fill: '#ccc',
            fontFamily: 'monospace',
            align: 'center'
        }).setOrigin(0.5);
        
        // Обновляем состояние звука (без остановки музыки)
        this.updateSoundState();
    }
}