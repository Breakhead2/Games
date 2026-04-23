let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    width: 1280,
    height: 720,
    padding: 20,
    scene: [BootScene, PreloadScene, StartScene, GameScene]
}

const game = new Phaser.Game(config);