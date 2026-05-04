class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame);
        
        this.velocity = 250;
        this.init();
    }

    static generate(scene) {
        const x = config.width + config.padding;
        const id = Phaser.Math.Between(1, 4);

        const enemy = new Enemy(scene, x, 0, 'enemy', `enemy${id}`);

        enemy.y = Phaser.Math.Between(
            config.padding + enemy.height / 2,
            config.height - config.padding - enemy.height / 2
        );

        return enemy;
    }

    init() {
        this.scene.add.existing(this);
        
        this.scene.physics.add.existing(this);
        this.body.enable = true;

        this.scene.events.on('update', this.update, this);
    }

    move() {   
        this.body.setVelocityX(-this.velocity);
    }

    reset() {
        this.x = config.width + config.padding;
        this.y = Phaser.Math.Between(
            config.padding + this.height / 2,
            config.height - config.padding - this.height / 2
        );
        const id = Phaser.Math.Between(1, 4);

        this.setFrame(`enemy${id}`);
        this.setAlive(true);
    }

    update() {
        if (this.active && this.x < -this.width) {
            this.setAlive(false);
            console.log('deactivated');
            
        }
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