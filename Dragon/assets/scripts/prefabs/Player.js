class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 150, scene.sys.game.config.height / 2, 'dragon', 'dragon1');

        this.init();
    }

    init() {
        this.scene.add.existing(this);
        
        //подключаем движок к спрайту
        this.scene.physics.add.existing(this);
        this.body.enable = true;

        this.velocity = 500;     
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