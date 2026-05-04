class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super();
        this.scene = scene;
        this.countMax = 10;
        this.countCreated = 0;
        
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.tick,
            loop: true,
            callbackScope: this, // чтобы внутри callback было this = Group
        })
    }

    createEnemy() {
        let enemy = this.getFirstDead();

        if (!enemy) {
            enemy = Enemy.generate(this.scene);
            this.add(enemy);
        } else {
            enemy.reset();
        }

        enemy.move();
        ++this.countCreated;
    }

    tick() {
        if (this.countCreated < this.countMax) {
            this.createEnemy();
        } else {
            this.timer.remove();
        }
    }
}