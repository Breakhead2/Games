import { BaseScene } from "./BaseScene.js";

export class ScoresScene extends BaseScene {
    constructor() {
        super('Scores');
    }

    create() {
        // Сначала создаем фон
        this.createBackground();
        
        // Создаем кнопку назад
        this.createBackButton();
        
        this.add.text(this.centerX, this.centerY - 150, 'HIGH SCORES', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        const scores = this.getScores();
        
        if (scores.length === 0) {
            this.add.text(this.centerX, this.centerY, 'No scores yet!', {
                fontSize: '20px',
                fill: '#888',
                fontFamily: 'monospace'
            }).setOrigin(0.5);
        } else {
            scores.forEach((score, index) => {
                this.add.text(this.centerX, this.centerY + index * 30, `${index + 1}. ${score.name} - ${score.points}`, {
                    fontSize: '20px',
                    fill: index === 0 ? '#ffd700' : '#ccc',
                    fontFamily: 'monospace'
                }).setOrigin(0.5);
            });
        }
        
        // Обновляем состояние звука (без остановки музыки)
        this.updateSoundState();
    }
    
    getScores() {
        const scores = localStorage.getItem('highScores');
        return scores ? JSON.parse(scores) : [];
    }
}