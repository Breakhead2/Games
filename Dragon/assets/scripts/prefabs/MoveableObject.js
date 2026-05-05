class MoveableObject extends Phaser.GameObjects.Sprite {
    constructor(data) {
        super(data.scene, data.x, data.y, data.sprite, data.frame); 
        this.velocity = data.velocity;
        this.init();
    }

    init() {
        this.scene.add.existing(this);
        
        this.scene.physics.add.existing(this);
        this.body.enable = true;

        this.scene.events.on('update', this.update, this);
    }

    move() {
        this.body.setVelocityX(this.velocity);
    }

    update() {
        if (this.active && this.isDead()) {
            this.setAlive(false);
        }
    }

    isDead() {
        return false;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;

        this.setAlive(true);
    }

    setAlive(status) {
        // активировать/деактивировать физ тело
        this.body.enable = status;
        // показать/скрыть текстуру
        this.setVisible(status);
        // активировать/деактировать объект
        this.setActive(status);
    }
}