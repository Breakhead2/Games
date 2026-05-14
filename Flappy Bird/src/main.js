import { Game } from 'phaser';
import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE,  // КЛЮЧ: всегда весь экран
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    pixelArt: true,
    backgroundColor: '#70c5ce',
    input: {
        // Отключаем стандартные жесты браузера для мобилок
        activePointers: 1,
        touchCancel: (pointer, event) => event.preventDefault()
    },
    scene: [BootScene, MenuScene, GameScene]
};

new Game(config);