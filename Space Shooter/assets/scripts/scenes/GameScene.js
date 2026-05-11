// scenes/GameScene.js
import { BaseScene } from "./BaseScene.js";
import { Player } from "../prefabs/Player.js";
import { Waves } from "../config/waves.js";
import { Enemies } from "../prefabs/Enemies.js";
import { EnemyTypes } from "../config/enemyTypes.js";
import { EnemyBullets } from "../prefabs/EnemyBullets.js";
import { MobileControls } from "../prefabs/MobileControls.js";

export class GameScene extends BaseScene {
    constructor() {
        super('Game');
        this.gameOnPause = true;
        this.currentWaveIndex = 0;
        this.gameFinished = false;
        this.score = 0;
        
        // Данные текущей волны
        this.waveEnemyInstances = [];
        this.spawnQueue = [];
        this.activeEnemies = new Map();
        this.spawnTimer = null;
        this.nextEnemyId = 1;
    }
    
    create() {
        this.createBackground();
        this.createExplodeAnim();
        this.createStartText();
        this.updateSoundState();
        this.player = new Player(this);
        
        this.createScoreText();
        this.createLivesDisplay();
        this.createWaveText();
        
        this.playGameMusic();
        
        // СНАЧАЛА создаём enemyBullets
        this.enemyBullets = new EnemyBullets(this);
        
        // ПОТОМ создаём пул врагов
        this.enemiesPool = new Enemies(this);
        this.enemiesPool.initPool();
        
        // Подготавливаем первую волну (но не запускаем до Enter)
        this.prepareWave();

        // КОЛЛИЗИИ
        this.physics.add.overlap(this.player.bullets, this.enemiesPool, this.handleBulletEnemyCollision, null, this);
        this.physics.add.overlap(this.player, this.enemyBullets, this.handlePlayerHit, null, this);
        this.physics.add.overlap(this.player, this.enemiesPool, this.handlePlayerEnemyCollision, null, this);
        
        // Добавляем обработчик изменения размера
        this.scale.on('resize', this.resizeMobileControls, this);
    }

    createScoreText() {
        this.scoreText = this.add.text(20, 20, 'SCORE: 0', {
            fontFamily: 'PressStart2P',
            fontSize: '18px',
            color: '#ffffff'
        });
    }

    createLivesDisplay() {
        // Создаём контейнер заново
        this.livesContainer = this.add.container(20, 60);
        
        // Создаём текст LIVES
        if (this.livesText) {
            this.livesText.destroy();
        }
        this.livesText = this.add.text(20, 65, 'LIVES:', {
            fontFamily: 'PressStart2P',
            fontSize: '14px',
            color: '#ffffff'
        });
        
        this.updateLivesDisplay();
    }

    updateLivesDisplay() {
        // Проверяем, существует ли контейнер
        if (!this.livesContainer) return;
        
        // Очищаем контейнер
        this.livesContainer.removeAll(true);
        
        // Отображаем количество жизней в виде спрайтов корабля
        if (this.player && this.player.hp > 0 && this.player.hp <= 3) {
            for (let i = 0; i < this.player.hp; i++) {
                const lifeIcon = this.add.sprite((i * 45) + 100, 0, 'ship', 'ship_1');
                lifeIcon.setDisplaySize(40, 40);
                lifeIcon.setOrigin(0);
                this.livesContainer.add(lifeIcon);
            }
        }
        
        // Убеждаемся, что текст LIVES существует
        if (!this.livesText) {
            this.livesText = this.add.text(20, 65, 'LIVES:', {
                fontFamily: 'PressStart2P',
                fontSize: '14px',
                color: '#ffffff'
            });
        }
    }

    showGameOver() {
        if (this.spawnTimer) this.spawnTimer.destroy();
        this.gameOnPause = true;
        
        const gameOverText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'GAME OVER', {
            fontFamily: 'PressStart2P',
            fontSize: '32px',
            color: '#ff0000'
        }).setOrigin(0.5);
        
        const scoreText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, `SCORE: ${this.score}`, {
            fontFamily: 'PressStart2P',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: [gameOverText, scoreText],
            alpha: 0,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
        
        this.time.delayedCall(5000, () => {
            this.cleanup();
            this.scene.stop('Game');
            this.scene.start('Menu');
        });
    }

    addScore(amount, plus = true) {
        if (plus) {
            this.score += amount;
        } else {
            this.score -= amount;
        }

        if (this.score < 0) this.score = 0;
        
        this.scoreText.setText(`SCORE: ${this.score}`);
    }
    
    prepareWave() {
        const wave = Waves[this.currentWaveIndex];
        if (!wave) {
            this.gameFinished = true;
            return;
        }
        
        // Обновляем текст волны
        this.updateWaveText();
        
        this.waveEnemyInstances = [];
        for (let enemyConfig of wave.enemies) {
            const typeKey = enemyConfig.type;
            const typeData = EnemyTypes[typeKey];
            for (let i = 0; i < enemyConfig.count; i++) {
                this.waveEnemyInstances.push({
                    id: this.nextEnemyId++,
                    typeKey: typeKey,
                    currentHp: typeData.hp,
                    isAlive: true
                });
            }
        }
        
        this.spawnQueue = this.waveEnemyInstances.map(e => e.id);
        this.shuffleArray(this.spawnQueue);
        this.totalAlive = this.waveEnemyInstances.length;
    }

    handleBulletEnemyCollision(bullet, enemy) {
        if (!bullet.isActive || !enemy.isActive) return;
        
        const damage = this.player.damage;
        enemy.takeDamage(damage);
        bullet.disable();
    }

    handlePlayerEnemyCollision(player, enemy) {
        if (player.invincible) return;
        if (!player.active || !enemy.isActive) return;
        
        const explosion = this.add.sprite((player.x + enemy.x) / 2, (player.y + enemy.y) / 2, 'explosion');
        explosion.setScale(0.3);
        explosion.play('explode');
        explosion.on('animationcomplete', () => explosion.destroy());
        
        player.takeDamage(1);
        enemy.takeDamage(1);

        this.addScore(enemy.score, false);
    }
    
    startWave() {
        if (this.gameOnPause) return;
        
        const wave = Waves[this.currentWaveIndex];
        if (!wave) return;
        
        this.spawnTimer = this.time.addEvent({
            delay: wave.spawnDelay,
            callback: () => this.spawnNextEnemy(),
            callbackScope: this,
            loop: true
        });
    }
    
    spawnNextEnemy() {
        if (this.spawnQueue.length === 0) {
            return;
        }
        
        let nextId = null;
        while (this.spawnQueue.length > 0) {
            const candidateId = this.spawnQueue.shift();
            const instance = this.waveEnemyInstances.find(e => e.id === candidateId);
            if (instance && instance.isAlive) {
                nextId = candidateId;
                break;
            }
        }
        
        if (!nextId) return;
        
        const instance = this.waveEnemyInstances.find(e => e.id === nextId);
        const freeEnemy = this.enemiesPool.getFreeEnemy();
        
        const typeData = EnemyTypes[instance.typeKey];
        freeEnemy.typeKey = instance.typeKey;
        freeEnemy.typeData = typeData;
        freeEnemy.setTexture('enemies', typeData.frame);
        
        const x = Phaser.Math.Between(50, this.scale.width - 50);
        const y = -40;
        
        freeEnemy.activate(instance, x, y);
        this.activeEnemies.set(instance.id, freeEnemy);
    }
    
    onEnemyExitScreen(enemySprite) {
        const instance = this.waveEnemyInstances.find(e => e.id === enemySprite.enemyInstanceId);
        if (!instance || !instance.isAlive) return;
        
        this.activeEnemies.delete(instance.id);
        this.enemiesPool.returnToPool(enemySprite);
        
        if (instance.currentHp > 0) {
            this.spawnQueue.push(instance.id);
        } else {
            if (instance.isAlive) this.onEnemyKilled(enemySprite);
        }
    }
    
    onEnemyKilled(enemySprite) {
        const instance = this.waveEnemyInstances.find(e => e.id === enemySprite.enemyInstanceId);
        if (!instance || !instance.isAlive) return;
        
        instance.isAlive = false;
        this.totalAlive--;
        
        this.activeEnemies.delete(instance.id);
        this.addScore(enemySprite.typeData.score);
        
        const sounds = this.game.registry.get('sounds');
        const soundEnabled = this.game.registry.get('soundEnabled');
        if (soundEnabled !== false && sounds && sounds.explosion) {
            sounds.explosion.play();
        }
        
        this.createExplosion(enemySprite.x, enemySprite.y);
        this.checkWaveComplete();
    }
    
    checkWaveComplete() {
        if (this.totalAlive === 0 && this.spawnQueue.length === 0 && this.activeEnemies.size === 0) {
            const wave = Waves[this.currentWaveIndex];
            this.time.delayedCall(wave.waveCompleteDelay, () => {
                this.currentWaveIndex++;
                if (this.currentWaveIndex >= Waves.length) {
                    this.gameFinished = true;
                    this.showGameComplete();
                } else {
                    this.showWaveTransition(this.currentWaveIndex + 1, () => {
                        this.prepareWave();
                        if (!this.gameOnPause) this.startWave();
                    });
                }
            });
        }
    }

    createWaveText() {
        this.waveText = this.add.text(this.scale.width - 20, 20, 'WAVE: 1', {
            fontFamily: 'PressStart2P',
            fontSize: '18px',
            color: '#ffffff'
        }).setOrigin(1, 0);
    }

    updateWaveText() {
        if (this.waveText) {
            this.waveText.setText(`WAVE: ${this.currentWaveIndex + 1}`);
        }
    }

    showGameComplete() {
        if (this.spawnTimer) this.spawnTimer.destroy();
        this.gameOnPause = true;
        this.player.disableControls();
        this.player.flyAway();
        
        this.time.delayedCall(300, () => {
            const gameCompleteText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'GAME COMPLETE', {
                fontFamily: 'PressStart2P',
                fontSize: '32px',
                color: '#ffffff'
            }).setOrigin(0.5);
            
            const scoreText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, `SCORE: ${this.score}`, {
                fontFamily: 'PressStart2P',
                fontSize: '24px',
                color: '#ffff00'
            }).setOrigin(0.5);
            
            this.tweens.add({
                targets: [gameCompleteText, scoreText],
                alpha: 0,
                duration: 800,
                yoyo: true,
                repeat: -1
            });
            
            this.time.delayedCall(5000, () => {
                this.cleanup();
                this.goToMenuScene();
            });
        });
    }

    showWaveTransition(waveNumber, onComplete) {
        this.player.disableControls();
        this.player.flyAway();
        
        const waveText = this.add.text(this.scale.width / 2, this.scale.height / 2, `WAVE ${waveNumber}`, {
            fontFamily: 'PressStart2P',
            fontSize: '48px',
            color: '#ffff00'
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: waveText,
            alpha: 0,
            scale: 2,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                waveText.destroy();
            }
        });
        
        this.time.delayedCall(3000, () => {
            this.player.resetPosition();
            this.player.enableControls();
            if (onComplete) onComplete();
        });
    }

    createExplodeAnim() {
        if (!this.anims.exists('explode')) {
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNames('explosion', {
                    start: 1,
                    end: 10,
                    prefix: 'explosion_'
                }),
                frameRate: 15,
                repeat: 0,
                hideOnComplete: true
            });
        }
    }

    createExplosion(x, y) {
        const explosion = this.add.sprite(x, y, 'explosion');
        explosion.setScale(0.5);
        explosion.play('explode');
        explosion.on('animationcomplete', () => explosion.destroy());
    }
    
    update(time, delta) {
        super.update(time, delta);
        
        if (!this.gameOnPause) {
            for (let [id, enemy] of this.activeEnemies) {
                if (enemy.isActive) enemy.update();
            }
            this.enemyBullets.update();
        }
    }
    
    createStartText() {
        const isMobile = this.isMobile();
        
        this.startButton = null;
        
        if (isMobile) { 
            this.tapText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 120, 'TAP TO START', {
                fontFamily: 'PressStart2P',
                fontSize: '20px',
                color: '#ffff00'
            }).setOrigin(0.5);
            
            this.tweens.add({
                targets: this.tapText,
                alpha: 0,
                duration: 500,
                yoyo: true,
                repeat: -1
            });
            
            this.input.once('pointerdown', () => {
                this.startGame();
            });
        } else {
            this.startText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'PRESS ENTER TO START', {
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
            });
            
            this.input.keyboard.once('keydown-ENTER', () => {
                this.startGame();
            });
        }
    }

    startGame() {
        if (this.gameOnPause) {
            this.gameOnPause = false;
            this.recreateUI();
            this.player.resetLives();
            this.player.setAlive(true);
            
            if (this.startText) {
                this.startText.destroy();
                this.startText = null;
            }
            if (this.startButton) {
                this.startButton.destroy();
                this.startButton = null;
            }
            if (this.tapText) {
                this.tapText.destroy();
                this.tapText = null;
            }
            
            this.startWave();
        }
    }

    recreateUI() {
        if (this.scoreText) {
            this.scoreText.destroy();
            this.scoreText = null;
        }
        if (this.waveText) {
            this.waveText.destroy();
            this.waveText = null;
        }
        if (this.livesText) {
            this.livesText.destroy();
            this.livesText = null;
        }
        if (this.livesContainer) {
            this.livesContainer.destroy();
            this.livesContainer = null;
        }
        
        this.createScoreText();
        this.createWaveText();
        this.createLivesDisplay();
        this.updateWaveText();
        this.updateLivesDisplay();
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    handlePlayerHit(player, bullet) {
        if (player.invincible) return;
        if (!bullet.isActive || !player.active) return;
        
        bullet.deactivate();
        player.takeDamage(1);

        this.addScore(100, false);
    }

    cleanup() {
        if (this.spawnTimer) {
            this.spawnTimer.destroy();
            this.spawnTimer = null;
        }
        
        for (let [id, enemy] of this.activeEnemies) {
            if (enemy && enemy.isActive) {
                enemy.deactivate();
            }
        }
        this.activeEnemies.clear();
        
        if (this.enemiesPool) {
            this.enemiesPool.getChildren().forEach(enemy => {
                if (enemy) enemy.deactivate();
            });
        }
        
        if (this.enemyBullets) {
            this.enemyBullets.getChildren().forEach(bullet => {
                if (bullet && bullet.isActive) bullet.deactivate();
            });
        }
        
        if (this.player && this.player.bullets) {
            this.player.bullets.getChildren().forEach(bullet => {
                if (bullet && bullet.isActive) bullet.disable();
            });
        }
        
        this.waveEnemyInstances = [];
        this.spawnQueue = [];
        
        this.gameOnPause = true;
        this.currentWaveIndex = 0;
        this.score = 0;

        this.scoreText = null;
        this.waveText = null;
        this.livesText = null;
        this.livesContainer = null;

        if (this.player && this.player.mobileControls) {
            this.player.mobileControls.destroy();
        }
    }

    resizeMobileControls() {
        if (!this.isMobile()) return;
        
        const { width, height } = this.scale;
        
        if (this.player && this.player.mobileControls) {
            const controls = this.player.mobileControls;
            if (controls.leftZone) {
                controls.leftZone.setPosition(width * 0.15, height - 120);
                controls.leftZone.setSize(width * 0.3, 100);
            }
            if (controls.rightZone) {
                controls.rightZone.setPosition(width * 0.85, height - 120);
                controls.rightZone.setSize(width * 0.3, 100);
            }
            if (controls.fireButton) {
                controls.fireButton.setPosition(width / 2, height - 120);
            }
        }
    }
}