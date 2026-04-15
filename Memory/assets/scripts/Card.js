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
        this.flip();
        this.opened = true;
    }

    close() {
        if (this.opened) {
            this.flip();
            this.opened = false;
        }
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