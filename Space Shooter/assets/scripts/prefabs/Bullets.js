import { Bullet } from "./Bullet.js";

export class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene)
    }

    createBullet(source) {
        let bullet = this.getFirstDead();

        if (!bullet) {
            bullet = new Bullet(this.scene, source);
            this.add(bullet);
        } else {
            bullet.reset(source.x, source.y);
        }

        bullet.move();

        this.playShootSound();
    }

       playShootSound() {
        // Получаем звуки из реестра
        const sounds = this.scene.game.registry.get('sounds');
        const soundEnabled = this.scene.game.registry.get('soundEnabled');
        
        if (soundEnabled !== false && sounds && sounds.laser) {
            sounds.laser.play();
        }
    }
}