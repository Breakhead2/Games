class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        this.scene.add.existing(this);
        this.opened = false;

        this.setInteractive();

        // this.on('pointerdown', this.open, this);
    }

    open() {
        this.flip('card' + this.value);
        this.opened = true;
    }

    close() {
        this.flip('card');
        this.opened = false;
    }

    flip(texture) {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
                this.show(texture);
            }
        });
    }

    show(texture) {
        this.setTexture(texture);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            ease: 'Linear',
            duration: 250,
        
        });
    }
}