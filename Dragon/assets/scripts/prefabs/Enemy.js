class Enemy extends MoveableObject {
    constructor(data) {
        super(data);
    }

    static generate(scene) {
        const enemy = new Enemy({
            scene,
            x: scene.sys.game.config.width + scene.sys.game.config.padding,
            y: 0,
            sprite: 'enemy',
            frame: `enemy${Phaser.Math.Between(1, 4)}`,
            velocity: -250
        });

        enemy.y = Phaser.Math.Between(
            scene.sys.game.config.padding + enemy.height / 2,
            scene.sys.game.config.height - scene.sys.game.config.padding - enemy.height / 2
        );

        return enemy;
    }

    reset() {
        super.reset(this.scene.sys.game.config.width + this.scene.sys.game.config.padding, Phaser.Math.Between(
            this.scene.sys.game.config.padding + this.height / 2,
            this.scene.sys.game.config.height - this.scene.sys.game.config.padding - this.height / 2
        ));
        
        this.setFrame(`enemy${Phaser.Math.Between(1, 4)}`);
        this.setAlive(true);
    }

    isDead() {
        return this.x < -this.width;
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