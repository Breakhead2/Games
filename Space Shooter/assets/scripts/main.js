const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 1280,
    scene: [],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);