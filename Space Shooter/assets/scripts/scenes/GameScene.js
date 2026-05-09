import { BaseScene } from "./BaseScene.js";
import { Player } from "../prefabs/Player.js";

export class GameScene extends BaseScene {
    constructor() {
        super('Game');

        this.gameOnPause = true;
    }

    create() {
        // Создаем фон
        this.createBackground();

        this.createStartText();
        
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
    }

    createStartText() {
        this.startText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Press ENTER to start', {
            fontFamily: 'PressStart2P',
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.startText,
            alpha: 0,
            ease: 'Linear',
            duration: 500,
            repeat: -1,
            yoyo: true,
        })


        this.input.keyboard.on('keydown-ENTER', () => {
            this.player.setAlive(true);
            this.startText.destroy();
        })
    }
    
}