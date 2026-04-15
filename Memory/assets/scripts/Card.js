class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        this.scene.add.existing(this);
        this.opened = false;

        this.setInteractive();
    }

    open() {
        this.flip();
        this.opened = true;
    }

    close() {
        if (this.opened) {
            this.flip();
            this.opened = false;
        }
    }

    init(position) {
        this.position = position;
        this.delay = position.delay;

        this.close();
        this.setPosition(-this.width, -this.height);
    }

    move(position) {
        this.scene.tweens.add({
            targets: this,
            x: position.x,
            y: position.y,
            delay: position.delay,
            scale: 1,
            ease: 'Back.easeOut',
            duration: 600
        });
    }

    flip() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
                this.show();
            }
        });
    }

    show() {
        let texture = this.opened ? 'card' + this.value : 'card'
        this.setTexture(texture);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            ease: 'Linear',
            duration: 250,
        
        });
    }
}