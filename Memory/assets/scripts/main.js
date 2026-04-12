let scene = new Phaser.Scene('Game');
let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    rows: 2,
    cols: 5,
    card: {
        width: 196,
        height: 306,
        gap: 14
    },
    scene: scene,
};
let game = new Phaser.Game(config);

scene.preload = function() {
    this.load.image('bg', './assets/sprites/background.png');
    this.load.image('card', './assets/sprites/card.png');
};

scene.create = function() {
    this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    this.getCardsPositions().forEach(element => {
        this.add.sprite(element.x, element.y, 'card').setOrigin(0, 0);
    });
};

scene.getCardsPositions = function() {
    let positions = [];
    let cardTexture = this.textures.get('card').getSourceImage();

    let offsetX = (this.sys.game.config.width - ((cardTexture.width + config.card.gap) * config.cols)) / 2;
    let offsetY = (this.sys.game.config.height - ((cardTexture.height + config.card.gap) * config.rows)) / 2;

    for (let i = 0; i < config.cols; i++) {
        for (let j = 0; j < config.rows; j++) {
            positions.push({
                x: i * (cardTexture.width + config.card.gap) + offsetX,
                y: j * (cardTexture.height + config.card.gap) + offsetY
            })
        }
    }

    return positions;
};