class Fire extends MoveableObject {
    constructor(data) {
        super(data);
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

    isDead() {
        return this.x > this.scene.sys.game.config.width + this.width || this.x < - this.width;
    }
}