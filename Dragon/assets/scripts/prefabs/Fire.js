class Fire extends Phaser.GameObjects.Sprite {
    constructor(data) {
        super(data.scene, data.x, data.y, data.sprite, data.frame);
        
        this.velocity = data.velocity;
        this.init(data);
    }

    init() {
        this.scene.add.existing(this);
    }

    static generate(scene, source) {
        return new Fire({
            scene,
            x: source.x + source.width / 2,
            y: source.y,
            sprite: 'fire',
            velocity: 300
        });
    }

    move() {
        this.body.setVelocityX(this.velocity);
    }

    reset() {

    }
}