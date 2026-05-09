import { Bullets } from "./Bullets.js";

export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, scene.centerX, scene.scale.height - 150, 'ship', 'ship_1');
        this.scene = scene;
        this.velocity = 400;
        this.shootDelay = 350;
        this.canShoot = true;
        this.lastShot = 0;
        this.upgrades = [];

        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.setOrigin(0.5, 0);

        this.setDisplaySize(100, 100);
        this.bullets = new Bullets(this.scene);

        // Не даем вылетать за границы
        this.body.setCollideWorldBounds(true);

        this.scene.events.on('update', this.update, this);
    }

    update() {
        this.autoShoot();
    }

    autoShoot() {
        const now = this.scene.time.now;

        if (now - this.lastShot >= this.shootDelay) {
            this.lastShot = now;
            this.bullets.createBullet(this);
        }
    }

    move() {
        this.body.setVelocityX(0);
        this.setFrame('ship_1');

        if (this.scene.cursors.left.isDown) {
            this.body.setVelocityX(-this.velocity);
            this.setFrame('ship_3');
        } else if (this.scene.cursors.right.isDown) {
            this.body.setVelocityX(this.velocity);
            this.setFrame('ship_2'); 
        }
    }
}