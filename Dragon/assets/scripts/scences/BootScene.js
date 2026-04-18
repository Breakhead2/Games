class BootScene extends Phaser.Scene {
    // тут предзагружаю все ассеты
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('bg', './assets/sprites/background.png');
        
    }

    create() {
        this.scene.start('Preload');     
    }
}