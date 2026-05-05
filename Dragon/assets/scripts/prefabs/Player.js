class Player extends Enemy {
    constructor(scene) {
        super({
            scene,
            x: 150,
            y: scene.sys.game.config.height / 2,
            sprite: 'dragon',
            frame: 'dragon1',
            velocity: 500
        });
        this.scene = scene;
    }

    init() {
        super.init();

        this.fires = new Fires(this.scene);

        this.timer = this.scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: this.fire,
            callbackScope: this
        });

        this.fires.createFire(this);
    }

    fire() {
        this.fires.createFire(this);
    }

    move() {   
        this.body.setVelocity(0);

        if (this.scene.cursors.down.isDown) {  
            if(this.scene.cursors.up.isDown) {
                this.body.setVelocity(0);
            } else {
                if (this.scene.sys.game.config.height > this.y + this.height / 2 + config.padding) {
                this.body.setVelocityY(this.velocity);
                }
            }
        } else if (this.scene.cursors.up.isDown) {
            if(this.scene.cursors.down.isDown) {
                this.body.setVelocity(0);
            } else {
                if (this.y - this.height / 2 - config.padding > 0) {
                    this.body.setVelocityY(-this.velocity);
                }
            }
        }

        if (this.scene.cursors.left.isDown) {
            if (this.scene.cursors.right.isDown) {
                this.body.setVelocity(0);
            } else {
                if (this.x - this.width / 2 - config.padding > 0) {
                    this.body.setVelocityX(-this.velocity);
                }
            }
        } else if (this.scene.cursors.right.isDown) {
            if (this.scene.cursors.left.isDown) {
                this.body.setVelocity(0);
            } else {
                if (this.x + this.width / 2 + config.padding < this.scene.sys.game.config.width) {
                    this.body.setVelocityX(this.velocity);
                }
            }
        }
    }
} 