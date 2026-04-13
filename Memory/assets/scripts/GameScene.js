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
        this.start();
    }

    start() {
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.initCards();
    }

    initCards() {
        let positions = this.getCardsPositions();

        this.cards.forEach(card => {
            let position = positions.pop();

            card.close();
            card.setPosition(position.x, position.y)
        })
    }

    createBackground() {
        this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    }

    createCards() {
        this.cards = [];

        config.cards.forEach(value => {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value))
            }
        });

        this.input.on('gameobjectdown', this.onCardClick, this)
    }

    onCardClick(pointer, card) {
        if (card.opened) return false;

        if (this.openedCard) {
            if (this.openedCard.value === card.value) {
                this.openedCard = null;
                ++this.openedCardsCount;
            } else {
                this.openedCard.close();
                this.openedCard = card;
            }
        } else {
            this.openedCard = card;
        }

        card.open();

        if (this.openedCardsCount === this.cards.length / 2) {
            this.start();
        }
    }

    getCardsPositions() {
        let positions = [];
        let cardTexture = this.textures.get('card').getSourceImage();

        let offsetX = (this.sys.game.config.width - ((cardTexture.width + config.card.gap) * config.cols)) / 2 + cardTexture.width / 2;
        let offsetY = (this.sys.game.config.height - ((cardTexture.height + config.card.gap) * config.rows)) / 2 + cardTexture.height / 2;

        for (let i = 0; i < config.cols; i++) {
            for (let j = 0; j < config.rows; j++) {
                positions.push({
                    x: i * (cardTexture.width + config.card.gap) + offsetX,
                    y: j * (cardTexture.height + config.card.gap) + offsetY
                })
            }
        }

        return Phaser.Utils.Array.Shuffle(positions);
    };
}
