import { EnemyBullet } from "./EnemyBullet.js";

export class EnemyBullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.poolSize = 30;
        this.initPool();
    }
    
    initPool() {
        for (let i = 0; i < this.poolSize; i++) {
            const bullet = new EnemyBullet(this.scene, -100, -100, 'bullet-red');
            bullet.deactivate();
            this.add(bullet);
        }
    }
    
    getFreeBullet() {
        for (let bullet of this.getChildren()) {
            if (!bullet.isActive) {
                return bullet;
            }
        }
        // Если нет свободных, создаём новый
        const newBullet = new EnemyBullet(this.scene, -100, -100, 'bullet-red');
        newBullet.deactivate();
        this.add(newBullet);
        return newBullet;
    }
    
    update() {
        for (let bullet of this.getChildren()) {
            if (bullet.isActive) bullet.update();
        }
    }
}