class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('bg', './assets/sprites/background.png');
        this.load.image('card', './assets/sprites/card.png');
        this.load.image('card1', './assets/sprites/card1.png');
        this.load.image('card2', './assets/sprites/card2.png');
        this.load.image('card3', './assets/sprites/card3.png');
        this.load.image('card4', './assets/sprites/card4.png');
        this.load.image('card5', './assets/sprites/card5.png');
    };

    create() {
        this.createBackground();
        this.createCards();
    }

    createBackground() {
        this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    }

    createCards() {
        this.cards = [];

        let positions = this.getCardsPositions();
        Phaser.Utils.Array.Shuffle(positions); //перемешивает массив

        config.cards.forEach(value => {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value, positions.pop()))
            }
            console.log(value);
        });
    }

    getCardsPositions() {
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
}
