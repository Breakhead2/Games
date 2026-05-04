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
    }

    move() {   
        this.body.setVelocityX(-this.velocity);
    }
}