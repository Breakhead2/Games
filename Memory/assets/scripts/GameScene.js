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

        this.load.audio('card', './assets/sounds/card.mp3');
        this.load.audio('complete', './assets/sounds/complete.mp3');
        this.load.audio('success', './assets/sounds/success.mp3');
        this.load.audio('theme', './assets/sounds/theme.mp3');
        this.load.audio('timeout', './assets/sounds/timeout.mp3');
    };

    create() {
        this.timeout = config.timeout;
        this.createSounds();
        this.createBackground();
        this.timeoutText = this.createText(10, 330, '', { fontFamily: 'Mabook', fontSize: '36px', color: '#ffffff' });
        this.createCards();
        this.createTimer();
        this.start();
    }

    start() {
        this.timeout = config.timeout;
        this.openedCard = null;
        this.openedCardsCount = 0;

        this.isGameOver = false;
        this.isWin = false;

        this.initCards();
        this.showCards();

        this.createTimer();

        this.sounds.theme.play();
    }

    initCards() {
        let positions = this.getCardsPositions();

        this.cards.forEach(card => {
            card.init(positions.pop());
        })
    }

    showCards() {
        this.cards.forEach(card => {
            card.move(card.position);
        }) 
    }

    createSounds() {
        this.sounds = {};
        this.sounds.card = this.sound.add('card');
        this.sounds.complete = this.sound.add('complete');
        this.sounds.success = this.sound.add('success');
        this.sounds.theme = this.sound.add('theme');
        this.sounds.timeout = this.sound.add('timeout');
        
        this.sounds.theme.play({
            loop: true,
            volume: 0.15
        });
    }

    createBackground() {
        this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    }

    createText(x, y, value, style) {
        return this.add.text(x, y, value, style);
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

    onTimerTick() {
        this.timeoutText.setText('Time: ' + this.timeout)

        if (this.timeout <= 0) {
            if (this.isGameOver) return;
            this.isGameOver = true;

            if (this.timer) {
                this.timer.remove();
                this.timer = null;
            }

            this.sounds.theme.stop();

            const sound = this.sounds.timeout;
            sound.stop();
            sound.play();

            sound.once('complete', () => {
                this.start();
            });

        } else {
            --this.timeout;
        }
    }

    createTimer() {
        if (this.timer) {
            this.timer.remove();
        }

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });
    }

    onCardClick(card) {
        if (card.opened) return false;

        this.sounds.card.play();

        if (this.openedCard) {
            if (this.openedCard.value === card.value) {
                if(this.openedCardsCount !== (this.cards.length / 2) - 1) {
                    this.sounds.success.play();
                }
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
            if (this.isWin) return;
            this.isWin = true;

            this.timer.remove(); // ❗ стоп таймера

            this.sounds.theme.stop();

            const sound = this.sounds.complete;
            sound.stop();
            sound.play();

            sound.once('complete', () => {
                this.start();
            });
        }
    }

    getCardsPositions() {
        let positions = [];
        let cardTexture = this.textures.get('card').getSourceImage();

        let offsetX = (this.sys.game.config.width - ((cardTexture.width + config.card.gap) * config.cols)) / 2 + cardTexture.width / 2 + 50;
        let offsetY = (this.sys.game.config.height - ((cardTexture.height + config.card.gap) * config.rows)) / 2 + cardTexture.height / 2;

        let index = 0;

        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    delay: ++index * 100,
                    x: col * (cardTexture.width + config.card.gap) + offsetX,
                    y: row * (cardTexture.height + config.card.gap) + offsetY,
                })
                index++;
            }
        }

        return Phaser.Utils.Array.Shuffle(positions);
    };
}
