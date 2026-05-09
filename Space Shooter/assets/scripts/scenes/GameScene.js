import { BaseScene } from "./BaseScene.js";
import { Player } from "../prefabs/Player.js";

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
        this.player = new Player(this);
        
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

    update(time, delta) {
        super.update(time, delta);
        
        this.player.move();
    }
}