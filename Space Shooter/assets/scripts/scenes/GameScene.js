// scenes/GameScene.js
import { BaseScene } from "./BaseScene.js";
import { Player } from "../prefabs/Player.js";
import { Waves } from "../config/waves.js";
import { Enemies } from "../prefabs/Enemies.js";
import { EnemyTypes } from "../config/enemyTypes.js";

export class GameScene extends BaseScene {
    constructor() {
        super('Game');
        this.gameOnPause = true;
        this.currentWaveIndex = 0;
        this.gameFinished = false;
        
        // Данные текущей волны
        this.waveEnemyInstances = [];   // массив { id, typeKey, currentHp, isAlive }
        this.spawnQueue = [];           // очередь ID врагов, ожидающих появления
        this.activeEnemies = new Map();  // activeEnemyId -> спрайт
        this.spawnTimer = null;
        this.nextEnemyId = 1;
    }
    
    create() {
        this.createBackground();
        this.createStartText();
        this.updateSoundState();
        this.player = new Player(this);
        
        this.playGameMusic();
        
        // Создаём пул врагов
        this.enemiesPool = new Enemies(this);
        this.enemiesPool.initPool();
        
        // Подготавливаем первую волну (но не запускаем до Enter)
        this.prepareWave();
    }
    
    prepareWave() {
        const wave = Waves[this.currentWaveIndex];
        if (!wave) {
            this.gameFinished = true;
            return;
        }
        
        // Превращаем конфиг волны в массив уникальных экземпляров врагов
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
        
        // Очередь спавна = все живые враги (порядок перемешиваем)
        this.spawnQueue = this.waveEnemyInstances.map(e => e.id);
        this.shuffleArray(this.spawnQueue);
        
        // Счётчик живых врагов (для проверки окончания волны)
        this.totalAlive = this.waveEnemyInstances.length;
        
        console.log(`Волна ${this.currentWaveIndex+1} подготовлена. Всего врагов: ${this.totalAlive}`);
    }
    
    startWave() {
        if (this.gameOnPause) return; // ждём Enter
        
        const wave = Waves[this.currentWaveIndex];
        if (!wave) return;
        
        // Запускаем таймер спавна
        this.spawnTimer = this.time.addEvent({
            delay: wave.spawnDelay,
            callback: () => this.spawnNextEnemy(),
            callbackScope: this,
            loop: true
        });
    }
    
    spawnNextEnemy() {
        if (this.spawnQueue.length === 0) {
            // Все враги уже появились (или ждут возврата)
            return;
        }
        
        // Находим следующего живого врага в очереди
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
        
        // Настроить спрайт под тип врага
        const typeData = EnemyTypes[instance.typeKey];
        freeEnemy.typeKey = instance.typeKey;
        freeEnemy.typeData = typeData;
        freeEnemy.setTexture('enemies', typeData.frame);
        
        // Случайная позиция сверху
        const x = Phaser.Math.Between(50, this.scale.width - 50);
        const y = -40;
        
        freeEnemy.activate(instance, x, y);
        this.activeEnemies.set(instance.id, freeEnemy);
    }
    
    // Вызывается, когда враг улетел за экран (не убит)
    onEnemyExitScreen(enemySprite) {
        // Найти соответствующий экземпляр
        const instance = this.waveEnemyInstances.find(e => e.id === enemySprite.enemyInstanceId);
        if (!instance || !instance.isAlive) return;

        console.log(`Враг ${instance.id} улетел, HP=${instance.currentHp}, добавляем в очередь`);
        
        // Удалить из активных
        this.activeEnemies.delete(instance.id);
        
        // Вернуть спрайт в пул
        this.enemiesPool.returnToPool(enemySprite);
        
        // Вернуть этого врага в конец очереди спавна, чтобы он зашёл на второй круг
        // Только если он ещё жив (HP > 0)
        if (instance.currentHp > 0) {
            this.spawnQueue.push(instance.id);
        } else {
            // На всякий случай, если HP = 0, но isAlive ещё true - убьём
            if (instance.isAlive) this.onEnemyKilled(enemySprite);
        }
    }
    
    // Вызывается, когда враг окончательно убит (лазером)
    onEnemyKilled(enemySprite) {
        const instance = this.waveEnemyInstances.find(e => e.id === enemySprite.enemyInstanceId);
        if (!instance || !instance.isAlive) return;
        
        instance.isAlive = false;
        this.totalAlive--;
        
        // Удалить из активных
        this.activeEnemies.delete(instance.id);
        
        // Добавить очки (позже)
        // this.score += enemySprite.typeData.score;
        
        // Спрайт уже уничтожен в Enemy.takeDamage() – ничего не делаем
        
        this.checkWaveComplete();
    }
    
    checkWaveComplete() {
        if (this.totalAlive === 0 && this.spawnQueue.length === 0 && this.activeEnemies.size === 0) {
            // Волна пройдена
            const wave = Waves[this.currentWaveIndex];
            this.time.delay(wave.waveCompleteDelay, () => {
                this.currentWaveIndex++;
                if (this.currentWaveIndex >= Waves.length) {
                    this.gameFinished = true;
                    console.log("Игра пройдена!");
                    // TODO: показать экран победы
                } else {
                    this.prepareWave();
                    if (!this.gameOnPause) this.startWave();
                }
            });
        }
    }
    
    update(time, delta) {
        super.update(time, delta);
        
        if (!this.gameOnPause) {
            // Обновить активных врагов
            for (let [id, enemy] of this.activeEnemies) {
                if (enemy.isActive) enemy.update();
            }
        }
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
        });
        
        this.input.keyboard.on('keydown-ENTER', () => {
            this.gameOnPause = false;
            this.player.setAlive(true);
            this.startText.destroy();
            this.startWave();   // запустить спавн врагов
        });
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}