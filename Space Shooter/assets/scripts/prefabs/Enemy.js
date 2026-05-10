// prefabs/Enemy.js
import { EnemyTypes } from "../config/enemyTypes.js";

export class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, typeKey) {
        const typeData = EnemyTypes[typeKey];
        super(scene, x, y, 'enemies', typeData.frame);
        
        this.scene = scene;
        this.typeKey = typeKey;
        this.typeData = typeData;
        this.currentHp = typeData.hp;
        this.enemyInstanceId = null;
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        // this.setDisplaySize(120, 120);
        // this.setAngle(180);
        this.body.setCollideWorldBounds(false);
        this.setActive(false);
        this.setVisible(false);
        // this.setScale(0.4);

        this.setDisplaySize(120, 100);   // растягивает под нужный размер
        this.body.setSize(120, 100);
        this.setAngle(180);
        
        // Таймер стрельбы (будет запускаться при активации)
        if (this.typeData.canShoot && this.typeData.shootCooldown) {
            this.shootTimer = this.scene.time.addEvent({
                delay: this.typeData.shootCooldown,
                callback: () => this.shoot(),
                callbackScope: this,
                loop: true,
                paused: true
            });
        }
    }
    
    // Активировать врага с заданными параметрами
    activate(enemyData, x, y) {
        this.enemyInstanceId = enemyData.id;
        this.currentHp = enemyData.currentHp;
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.isActive = true;
        this.body.setVelocity(0, 0);
        
        // Запустить стрельбу, если нужно
        if (this.shootTimer) {
            this.shootTimer.paused = false;
        }
    }
    
    // Деактивировать врага (ушёл за экран или временно вернуть в пул)
    deactivate() {
        this.setActive(false);
        this.setVisible(false);
        this.isActive = false;
        this.body.setVelocity(0, 0);
        
        if (this.shootTimer) {
            this.shootTimer.paused = true;
        }
    }
    
    update() {
        if (!this.isActive) return;
        this.moveTowardPlayer();
        this.checkBounds();
    }
    
    moveTowardPlayer() {
        const player = this.scene.player;
        if (!player || ! player.active) return;
        
        const diff = player.x - this.x;
        const threshold = 5; // мёртвая зона в пикселях
        
        if (Math.abs(diff) < threshold) {
            this.body.setVelocityX(0);
        } else if (diff > 0) {
            this.body.setVelocityX(this.typeData.speedX);
        } else {
            this.body.setVelocityX(-this.typeData.speedX);
        }
        
        this.body.setVelocityY(this.typeData.speedY);
    }
    
    checkBounds() {
        // Если улетел за нижнюю границу или слишком высоко
        if (this.y > this.scene.scale.height + 50 || this.y < -100) {
            // Не уничтожаем, а уведомляем сцену о выходе
            this.scene.onEnemyExitScreen(this);
            this.deactivate();
        }
    }
    
    shoot() {
        if (!this.isActive) return;
        // TODO: позже добавим создание снаряда
        // console.log(`${this.typeKey} стреляет`);
    }
    
    // Вызвать при попадании (пока заглушка)
    takeDamage(amount) {
        this.currentHp -= amount;
        if (this.currentHp <= 0) {
            // Окончательно убит
            this.scene.onEnemyKilled(this);
            this.destroy();
        }
    }
    
    destroy() {
        if (this.shootTimer) this.shootTimer.destroy();
        super.destroy();
    }
}