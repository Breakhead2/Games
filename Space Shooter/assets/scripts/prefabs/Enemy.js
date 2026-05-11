import { EnemyTypes } from "../config/enemyTypes.js";
import { EnemyBullet } from "./EnemyBullet.js";

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
        
        this.body.setCollideWorldBounds(false);
        this.setActive(false);
        this.setVisible(false);

        this.setDisplaySize(100, 80);
        this.body.setSize(100, 80);
        this.setAngle(180);
        
        // Не создаём таймер здесь!
        this.shootTimer = null;
    }
    
    activate(enemyData, x, y) {
        this.enemyInstanceId = enemyData.id;
        this.currentHp = enemyData.currentHp;
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.isActive = true;
        this.body.setVelocity(0, 0);
        
        // Создаём таймер при активации, если враг может стрелять
        if (this.typeData.canShoot && this.typeData.shootCooldown && !this.shootTimer) {
            this.shootTimer = this.scene.time.addEvent({
                delay: this.typeData.shootCooldown,
                callback: () => this.shoot(),
                callbackScope: this,
                loop: true
            });
        }
    }

    deactivate() {
        this.setActive(false);
        this.setVisible(false);
        this.isActive = false;
        this.body.setVelocity(0, 0);
        
        // Уничтожаем таймер при деактивации
        if (this.shootTimer) {
            this.shootTimer.destroy();
            this.shootTimer = null;
        }
    }
    
    update() {
        if (!this.isActive) return;
        this.moveTowardPlayer();
        this.checkBounds();
    }
    
    moveTowardPlayer() {
        const player = this.scene.player;
        if (!player || !player.active || !player.body) return;
        
        const diff = player.x - this.x;
        const threshold = 5;
        
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
        if (this.y > this.scene.scale.height + 50 || this.y < -100) {
            this.scene.onEnemyExitScreen(this);
            this.deactivate();
        }
    }
    
    shoot() {
        if (!this.isActive) return;
        
        const bullets = this.scene.enemyBullets;
        if (!bullets) return;
        
        const bullet = bullets.getFreeBullet();
        if (bullet) {
            bullet.activate(this.x, this.y + 20);
        }
    }
    
    takeDamage(amount) {
        if (!this.isActive) return;
        
        this.currentHp -= amount;
        
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => this.clearTint());
        
        if (this.currentHp <= 0) {
            this.scene.onEnemyKilled(this);
            this.destroy();
        } else {
            // Если враг выжил, но получил урон от столкновения, 
            // можно добавить небольшое отталкивание
            const player = this.scene.player;
            if (player && player.active) {
                const direction = this.x > player.x ? 1 : -1;
                this.body.setVelocityX(this.body.velocity.x + direction * 50);
            }
        }
    }
    
    destroy() {
        if (this.shootTimer) this.shootTimer.destroy();
        super.destroy();
    }
}