export class BaseScene extends Phaser.Scene {
    constructor(scene) {
        super(scene);
    }

    init() {
        this.bgSpeed = 60;
        this.centerX = this.scale.width / 2;
        this.centerY = this.scale.height / 2;
        this.padding = 100;
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        // Создаем фон, если его еще нет
        this.createBackground();
        this.createText();
        
        // Инициализируем глобальную музыку при первом запуске
        this.initGlobalMusic();
    }

    update(time, delta) {
        // Анимируем фон, если он существует
        if (this.bg && this.bg.active) {
            this.bg.tilePositionY -= this.bgSpeed * (delta / 1000);
        }
    }

    // Инициализация глобальной музыки (один раз для всей игры)
    initGlobalMusic() {
        // Проверяем, есть ли уже глобальный объект с музыкой
        if (!this.game.registry.has('globalMusic')) {
            this.game.registry.set('globalMusic', {
                currentMusic: null,
                currentKey: null
            });
        }
        
        // Создаем звуки, если их еще нет в реестре
        if (!this.game.registry.has('sounds')) {
            if (this.cache.audio.exists('menu') && this.cache.audio.exists('game')) {
                const sounds = {
                    menu: this.sound.add('menu', {volume: 1, loop: true}),
                    game: this.sound.add('game', {volume: 1, loop: true})
                };
                this.game.registry.set('sounds', sounds);
            }
        }
    }

    // Получение глобальных звуков
    getGlobalSounds() {
        return this.game.registry.get('sounds');
    }

    // Получение состояния глобальной музыки
    getGlobalMusicState() {
        return this.game.registry.get('globalMusic');
    }

    // Воспроизведение музыки меню (глобально)
    playMenuMusic() {
        const soundEnabled = this.game.registry.get('soundEnabled');
        if (soundEnabled === false) {
            return;
        }

        const sounds = this.getGlobalSounds();
        if (!sounds || !sounds.menu) return;

        const globalMusic = this.getGlobalMusicState();
        
        // Если уже играет музыка меню, ничего не делаем
        if (globalMusic.currentKey === 'menu' && globalMusic.currentMusic && globalMusic.currentMusic.isPlaying) {
            return;
        }

        // Останавливаем текущую музыку, если она есть
        if (globalMusic.currentMusic && globalMusic.currentMusic.isPlaying) {
            globalMusic.currentMusic.stop();
        }

        // Запускаем музыку меню
        globalMusic.currentMusic = sounds.menu;
        globalMusic.currentKey = 'menu';
        globalMusic.currentMusic.play();
        
        // Сохраняем состояние
        this.game.registry.set('globalMusic', globalMusic);
    }

    // Воспроизведение игровой музыки (глобально)
    playGameMusic() {
        const soundEnabled = this.game.registry.get('soundEnabled');
        if (soundEnabled === false) {
            return;
        }

        const sounds = this.getGlobalSounds();
        if (!sounds || !sounds.game) return;

        const globalMusic = this.getGlobalMusicState();
        
        // Если уже играет игровая музыка, ничего не делаем
        if (globalMusic.currentKey === 'game' && globalMusic.currentMusic && globalMusic.currentMusic.isPlaying) {
            return;
        }

        // Останавливаем текущую музыку, если она есть
        if (globalMusic.currentMusic && globalMusic.currentMusic.isPlaying) {
            globalMusic.currentMusic.stop();
        }

        // Запускаем игровую музыку
        globalMusic.currentMusic = sounds.game;
        globalMusic.currentKey = 'game';
        globalMusic.currentMusic.play();
        
        // Сохраняем состояние
        this.game.registry.set('globalMusic', globalMusic);
    }

    // Остановка музыки (глобально)
    stopMusic() {
        const globalMusic = this.getGlobalMusicState();
        
        if (globalMusic.currentMusic && globalMusic.currentMusic.isPlaying) {
            globalMusic.currentMusic.stop();
            globalMusic.currentMusic = null;
            globalMusic.currentKey = null;
            this.game.registry.set('globalMusic', globalMusic);
        }
    }

    // Обновление состояния звука (вкл/выкл)
    updateSoundState() {
        const soundEnabled = this.game.registry.get('soundEnabled');
        
        // Применяем настройки ко всем звукам
        if (soundEnabled === false) {
            this.sound.setMute(true);
            // Останавливаем глобальную музыку, если она играет
            const globalMusic = this.getGlobalMusicState();
            if (globalMusic.currentMusic && globalMusic.currentMusic.isPlaying) {
                globalMusic.currentMusic.pause();
            }
        } else {
            this.sound.setMute(false);
            // Возобновляем глобальную музыку, если она была на паузе
            const globalMusic = this.getGlobalMusicState();
            if (globalMusic.currentMusic && !globalMusic.currentMusic.isPlaying) {
                globalMusic.currentMusic.resume();
            }
        }
    }

    createText() {
        const title = this.add.text(this.sys.game.config.width / 2, 200, 'SPACE SHOOTER', {
            fontFamily: 'PressStart2P',
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }

    createBackground() {
        // Создаем фон, если его нет или он уничтожен
        if (!this.bg || !this.bg.active) {
            this.bg = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'bg');
            this.bg.setOrigin(0);
        }
    }

    goToMenuScene(delay = 0) {
        this.time.delayedCall(delay, () => {
            this.cameras.main.fadeOut(300, 0, 0, 0);
            
            this.time.delayedCall(500, () => {
                this.scene.start('Menu');
            });
        });
    }

    goToMenuSceneImmediate() {
        this.scene.start('Menu');
    }

    createBackButton(x = 20, y = 20) {
        const backBtn = this.add.text(x, y, '← НАЗАД', {
            fontSize: '18px',
            fill: '#0ff',
            fontFamily: 'monospace',
            backgroundColor: '#00000088',
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true });
        
        backBtn.on('pointerover', () => {
            backBtn.setFill('#ff0');
            backBtn.setScale(1.05);
        });
        
        backBtn.on('pointerout', () => {
            backBtn.setFill('#0ff');
            backBtn.setScale(1);
        });
        
        backBtn.on('pointerdown', () => {
            this.goToMenuScene();
        });
        
        return backBtn;
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    playSoundIfEnabled(soundKey) {
        const soundEnabled = this.game.registry.get('soundEnabled');
        if (soundEnabled !== false && this.sound.get(soundKey)) {
            this.sound.play(soundKey);
        }
    }
}