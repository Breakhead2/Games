let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [BootScene, PreloadScene, StartScene]
}

const game = new Phaser.Game(config);