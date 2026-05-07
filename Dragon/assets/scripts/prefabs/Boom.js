class Boom extends Phaser.GameObjects.Sprite {
    static generate(scene, x, y) {
        return new Boom({scene, x, y});
    }
    constructor(data) {
        super(data.scene, data.x, data.y, 'boom', 'boom1');
        this.scene.add.existing(this);

        // Сгенерировать набор фреймов текстуры, необходимых для анимации
        const frames = this.scene.anims.generateFrameNames('boom', {
            prefix: 'boom',
            start: 1,
            end: 4
        });

        // Создать новую анимацию на основе полученного набора фреймов
        this.scene.anims.create({
            key: 'boom',
            frames,
            frameRate: 10,
            repeat: 0
        });

        // Запустить анимацию
        this.play('boom');

        this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            this.destroy();
        });
    }
}