class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super();
        this.scene = scene;
        this.count = 5;
        
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.tick,
            loop: true,
            callbackScope: this, // чтобы внутри callback было this = Group
        })
    }

    createEnemy() {
        let enemy = Enemy.generate(this.scene);
        this.add(enemy);
        enemy.move();
    }

    tick() {
        if (this.getLength() < this.count) {
            this.createEnemy();
        } else {
            this.timer.remove();
        }
    }
}