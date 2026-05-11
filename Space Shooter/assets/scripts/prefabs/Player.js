import { Bullets } from "./Bullets.js";
import { MobileControls } from "./MobileControls.js";

export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, scene.centerX, scene.scale.height - 150, 'ship', 'ship_1');
        this.scene = scene;
        this.velocity = 400;
        this.shootDelay = 200;
        this.lastShot = 0;
        this.upgrades = [];
        this.damage = 1;
        this.controlsEnabled = true;
        this.shootingEnabled = true;
        this.invincible = false;
        this.hp = 3;
        this.maxHp = 3;
        
        this.init();
    }

    init() {
        if (this.scene.isMobile) {
            this.y -= 200;
        }
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.setOrigin(0.5, 0);

        this.setDisplaySize(100, 100);
        this.bullets = new Bullets(this.scene);

        this.body.setCollideWorldBounds(true);

        // Клавиатура для ПК
        this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Мобильные кнопки (только если устройство мобильное)
        this.mobileControls = new MobileControls(this.scene);

        this.scene.events.on('update', this.update, this);
        this.setAlive(false);
    }

    update() {
        if (this.active) {
            if (this.controlsEnabled) {
                this.move();
            }
            if (this.shootingEnabled) {
                this.manualShoot();
            }
        }
    }

    manualShoot() {
        let shoot = false;
        
        // Стрельба с клавиатуры (ПК)
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            shoot = true;
        }
        
        // Стрельба с мобильной кнопки
        if (this.mobileControls && this.mobileControls.isMobile && this.mobileControls.isFirePressed()) {
            shoot = true;
        }
        
        if (shoot) {
            const now = this.scene.time.now;
            if (now - this.lastShot >= this.shootDelay) {
                this.lastShot = now;
                this.bullets.createBullet(this);
            }
        }
    }

    move() {
        this.body.setVelocityX(0);
        this.setFrame('ship_1');
        
        let moveLeft = false;
        let moveRight = false;
        
        // Движение с клавиатуры (ПК)
        if (this.scene.cursors.left.isDown) {
            moveLeft = true;
        }
        if (this.scene.cursors.right.isDown) {
            moveRight = true;
        }
        
        // Движение с мобильных кнопок (если они есть и устройство мобильное)
        if (this.mobileControls && this.mobileControls.isMobile) {
            const direction = this.mobileControls.getMovement();
            if (direction === -1) {
                moveLeft = true;
                moveRight = false;
            } else if (direction === 1) {
                moveLeft = false;
                moveRight = true;
            }
        }
        
        if (moveLeft) {
            this.body.setVelocityX(-this.velocity);
            this.setFrame('ship_3');
        } else if (moveRight) {
            this.body.setVelocityX(this.velocity);
            this.setFrame('ship_2'); 
        }
    }

    takeDamage(amount) {
        // НЕ НАНОСИМ УРОН, ЕСЛИ ИГРОК НЕУЯЗВИМ
        if (!this.active || this.invincible) return;
        
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => this.clearTint());
        
        this.hp -= amount;
        this.scene.updateLivesDisplay();
        
        if (this.hp <= 0) {
            this.die();
        } else {
            this.makeInvincible();
        }
    }
    
    makeInvincible() {
        this.invincible = true;
        // НЕ отключаем управление и стрельбу, только мигаем
        // this.controlsEnabled = false;
        // this.shootingEnabled = false;
        
        let blinkCount = 0;
        const maxBlinks = 8;
        
        const blinkInterval = this.scene.time.addEvent({
            delay: 150,
            callback: () => {
                this.visible = !this.visible;
                blinkCount++;
                if (blinkCount >= maxBlinks) {
                    blinkInterval.destroy();
                    this.visible = true;
                    this.invincible = false;
                }
            },
            callbackScope: this,
            loop: true
        });
    }
    
    die() {
        this.disableControls();
        this.setVisible(false);
        this.setActive(false);
        this.body.enable = false;
        
        this.scene.createExplosion(this.x, this.y);
        
        const sounds = this.scene.game.registry.get('sounds');
        const soundEnabled = this.scene.game.registry.get('soundEnabled');
        if (soundEnabled !== false && sounds && sounds.explosion) {
            sounds.explosion.play();
        }
        
        this.scene.time.delayedCall(500, () => {
            this.scene.showGameOver();
        });
    }

    disableControls() {
        this.controlsEnabled = false;
        this.shootingEnabled = false;
        this.body.setVelocityX(0);
    }

    enableControls() {
        this.controlsEnabled = true;
        this.shootingEnabled = true;
    }

    flyAway() {
        this.setFrame('ship_1');
        this.disableControls();
        this.body.setCollideWorldBounds(false);
        this.body.setVelocityY(-500);
    }

    resetPosition() {
        this.body.setVelocity(0, 0);
        this.body.setCollideWorldBounds(true);
        this.setPosition(this.scene.centerX, this.scene.scale.height - 150);
        this.setVisible(true);
        this.setActive(true);
        this.body.enable = true;
        this.invincible = false;  // <-- СБРАСЫВАЕМ ФЛАГ
        this.controlsEnabled = true;
        this.shootingEnabled = true;
    }

    setAlive(status) {
        this.body.enable = status;
        this.setActive(status);
        this.setVisible(status);
        if (status) {
            this.hp = this.maxHp;
            this.invincible = false;  // <-- СБРАСЫВАЕМ ФЛАГ
            this.scene.updateLivesDisplay();
        }
    }
    
    resetLives() {
        this.hp = this.maxHp;
        this.invincible = false;  // <-- СБРАСЫВАЕМ ФЛАГ
        this.scene.updateLivesDisplay();
    }
}