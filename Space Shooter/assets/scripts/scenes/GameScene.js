import { BaseScene } from "./BaseScene.js";

export class GameScene extends BaseScene {
    constructor() {
        super('Game');
    }

    create() {
        // Создаем фон
        this.createBackground();
        
        // Обновляем состояние звука
        this.updateSoundState();
        
        // Создаем корабль
        this.player = this.add.sprite(this.centerX, this.scale.height - 100, 'ship');
        this.player.setDisplaySize(100, 100);
        
        // Включаем звук после взаимодействия
        this.enableAudioOnInteraction();
        
        // Запускаем игровую музыку (она заменит музыку меню)
        this.playGameMusic();
    }

    // Метод для включения аудио после взаимодействия
    enableAudioOnInteraction() {
        if (this.sound.context.state === 'suspended') {
            const enableAudio = () => {
                this.sound.context.resume();
                this.input.off('pointerdown', enableAudio);
                this.input.keyboard.off('keydown', enableAudio);
            };
            
            this.input.once('pointerdown', enableAudio);
            this.input.keyboard.once('keydown', enableAudio);
        }
    }
}