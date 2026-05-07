import { BaseScene } from "./BaseScene.js";

export class MenuScene extends BaseScene {
    constructor() {
        super('Menu');

        this.selectedIndex = 0;
        this.menuItems = [
            { text: 'PLAY GAME', scene: 'Game', action: null, y: 0 },
            { text: 'TUTORIAL', scene: 'Tutorial', action: null, y: 60 },
            { text: 'HIGH SCORES', scene: 'Scores', action: null, y: 120 },
            { text: 'SOUND: ON', scene: null, action: 'toggleSound', y: 180 }
        ];
    }

    create() {
        // Создаем фон и всё остальное
        super.create();
        
        this.createMenu();
        this.versionGame();

        // Включаем звук после любого взаимодействия с пользователем
        this.enableAudioOnInteraction();
        
        // Обновляем состояние звука
        this.updateSoundState();
        
        // Запускаем музыку меню
        this.playMenuMusic();
    }

    // Метод для включения аудио после взаимодействия
    enableAudioOnInteraction() {
        // Проверяем, нужно ли включать звук
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

    createMenu() {
        this.menuTexts = [];
        this.menuItems.forEach((item, index) => {
            const menuText = this.add.text(this.centerX, this.centerY + item.y, item.text, {
                fontSize: '28px',
                fill: index === 0 ? '#ff0' : '#fff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);
            
            menuText.setInteractive({ useHandCursor: true });
            
            menuText.on('pointerover', () => {
                this.selectMenuItem(index);
            });
            
            menuText.on('pointerdown', () => {
                this.executeMenuItem(index);
            });
            
            this.menuTexts.push(menuText);
        });

        this.pointer = this.add.sprite(this.centerX - 150, this.centerY + this.menuItems[0].y, 'ship');
        this.pointer.setScale(0.2);
        this.pointer.setOrigin(0.5);

        this.input.keyboard.on('keydown-UP', () => {
            this.navigateMenu(-1);
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.navigateMenu(1);
        });
        this.input.keyboard.on('keydown-ENTER', () => {
            this.executeMenuItem(this.selectedIndex);
        });

        // Обновляем текст кнопки звука на основе сохраненного состояния
        this.updateSoundButtonText();
    }
    
    updateSoundButtonText() {
        const soundEnabled = this.game.registry.get('soundEnabled');
        if (soundEnabled === false) {
            this.menuItems[3].text = 'SOUND: OFF';
            if (this.menuTexts[3]) {
                this.menuTexts[3].setText('SOUND: OFF');
            }
        } else {
            this.menuItems[3].text = 'SOUND: ON';
            if (this.menuTexts[3]) {
                this.menuTexts[3].setText('SOUND: ON');
            }
        }
    }

    selectMenuItem(index) {
        this.selectedIndex = index;
        
        this.menuTexts.forEach((text, i) => {
            text.setFill(i === index ? '#ff0' : '#fff');
        });
        
        if (this.pointer && this.menuTexts[index]) {
            this.tweens.add({
                targets: this.pointer,
                y: this.menuTexts[index].y,
                duration: 150,
                ease: 'Back.easeOut'
            });
        }
    }
    
    navigateMenu(direction) {
        let newIndex = this.selectedIndex + direction;
        if (newIndex < 0) newIndex = this.menuItems.length - 1;
        if (newIndex >= this.menuItems.length) newIndex = 0;
        this.selectMenuItem(newIndex);
    }
    
    executeMenuItem(index) {
        const item = this.menuItems[index];
        
        if (item.action === 'toggleSound') {
            // Переключаем состояние звука
            const current = this.game.registry.get('soundEnabled');
            const newState = current === false ? true : false;
            this.game.registry.set('soundEnabled', newState);
            
            // Обновляем текст
            const newText = newState ? 'SOUND: ON' : 'SOUND: OFF';
            item.text = newText;
            if (this.menuTexts[index]) {
                this.menuTexts[index].setText(newText);
            }
            
            // Применяем новые настройки
            this.updateSoundState();
            
            // Если звук включили, запускаем музыку
            if (newState) {
                this.playMenuMusic();
            } else {
                // Если выключили, останавливаем музыку
                this.stopMusic();
            }
            
            return;
        }
        
        if (item.scene) {
            // Переход на другую сцену
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start(item.scene);
            });
        }
    }

    versionGame() {
        this.add.text(this.scale.width - 10, this.scale.height - 20, 'v1.0', {
            fontSize: '18px',
            fill: '#666',
            fontFamily: 'monospace'
        }).setOrigin(1, 0.5);
    }

    startGame() {
        this.scene.start('Game');
    }
}