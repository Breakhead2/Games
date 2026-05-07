class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.fires = new Fires(this.scene);
        this.countMax = 20;
        this.countCreated = 0;
        this.countKilled = 0;

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.tick,
            callbackScope: this
        });
    }

    tick() {
        if (this.countCreated < this.countMax) {
            this.createEnemy();
        } else {
            this.timer.remove();
        }
    }

    onEnemyKilled() {
        ++this.countKilled;

        if (this.countKilled >= this.countMax) {
            this.scene.events.emit('enemies-killed');
        }
    }

    createEnemy() {
        let enemy = this.getFirstDead();

        if (!enemy) {
            enemy  = Enemy.generate(this.scene, this.fires);
            enemy.on('killed', this.onEnemyKilled, this);
            this.add(enemy);
        } else {
            enemy.reset();
        }

        enemy.move();
        ++this.countCreated;
    }
}