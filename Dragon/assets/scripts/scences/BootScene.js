class BootScene extends Phaser.Scene {
    // тут предзагружаю все ассеты
    constructor() {
        super('Boot');
    }

    preload() {
        console.log('Boot.scene preload assets');
        this.load.image('bg', './assets/sprites/background.png');
        
    }

    create() {
        console.log('Boot.scene create');
        this.scene.start('Preload');     
    }
}