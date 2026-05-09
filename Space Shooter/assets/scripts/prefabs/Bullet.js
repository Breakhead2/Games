export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, source, velocity = 500) {
        super(scene, source.x, source.y - source.displayHeight / 2, 'bullets_2', 'bullet_3');

        this.scene = scene;
        this.velocity = velocity;
        this.isActive = false;

        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false; // Изначально выключено
        this.setVisible(false);
        this.setActive(false);

        this.setAngle(90);
    }

    reset(x, y) {
        // Обновляем позицию пули
        this.x = x;
        this.y = y;

        // Активируем пулю
        this.isActive = true;
        this.setVisible(true);
        this.setActive(true);
        this.body.enable = true;
    }
    
    disable() {
        // Деактивируем пулю
        this.isActive = false;
        this.setVisible(false);
        this.setActive(false);
        this.body.enable = false;
        this.body.setVelocity(0, 0);
    }

    move() {
        if (this.isActive) {
            this.body.setVelocityY(-this.velocity);
        }
    }
    
    update() {
        // Уничтожаем пулю, когда она улетела за экран
        if (this.isActive && this.y < -50) {
            this.disable();
        }
    }
}