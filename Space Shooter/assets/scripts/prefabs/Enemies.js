// prefabs/Enemies.js
import { Enemy } from "./Enemy.js";

export class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.pool = [];           // все доступные спрайты врагов
        this.maxPoolSize = 15;    // максимальное количество одновременно существующих спрайтов
    }
    
    // Инициализировать пул (создать спрайты заранее)
    initPool() {
        for (let i = 0; i < this.maxPoolSize; i++) {
            const enemy = new Enemy(this.scene, -100, -100, 'soldier1'); // временный тип
            enemy.deactivate();
            this.add(enemy);
            this.pool.push(enemy);
        }
    }
    
    // Получить свободный спрайт из пула
    getFreeEnemy() {
        for (let enemy of this.pool) {
            if (!enemy.isActive) {
                return enemy;
            }
        }
        // Если все заняты — создаём новый (расширяем пул)
        const newEnemy = new Enemy(this.scene, -100, -100, 'soldier1');
        newEnemy.deactivate();
        this.add(newEnemy);
        this.pool.push(newEnemy);
        return newEnemy;
    }
    
    // Вернуть врага в пул (деактивировать)
    returnToPool(enemy) {
        enemy.deactivate();
    }
}