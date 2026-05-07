import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { StartScene } from './scenes/StartScene.js';
import { GameScene } from './scenes/GameScene.js';

export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 960,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT
    },
    render: {
        pixelArt: true,
        antialias: false
    },
    padding: 100,

    scene: [BootScene, PreloadScene, StartScene, GameScene]
};

const game = new Phaser.Game(config);