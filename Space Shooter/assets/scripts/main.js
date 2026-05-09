import { BootScene } from './scenes/BootScene.js';
import { PreloadScene } from './scenes/PreloadScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { TutorialScene } from './scenes/TutorialScene.js';
import { ScoresScene } from './scenes/ScoresScene.js';
import { GameScene } from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 960,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0},
            fps: 60
        }
    },
    scale: {
        mode: Phaser.Scale.FIT
    },
    render: {
        pixelArt: true,
        antialias: false
    },

    scene: [
        BootScene, 
        PreloadScene, 
        MenuScene, 
        TutorialScene, 
        ScoresScene, 
        GameScene
    ]
};

const game = new Phaser.Game(config);
game.registry.set('soundEnabled', true);
game.registry.set('globalMusic', {
    currentMusic: null,
    currentKey: null
});