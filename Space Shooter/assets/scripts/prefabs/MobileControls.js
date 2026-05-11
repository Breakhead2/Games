export class MobileControls {
    constructor(scene) {
        this.scene = scene;
        this.isMobile = scene.isMobile();
        
        if (this.isMobile) {
            this.createControls();
        }
    }
    
    createControls() {
        const { width, height } = this.scene.scale;
        
        // Левая зона для движения влево (30% экрана слева)
        this.leftZone = this.scene.add.rectangle(width * 0.15, height - 120, width * 0.3, 100, 0x000000, 0.5)
            .setStrokeStyle(2, 0x00ff00)
            .setInteractive({ useHandCursor: true });
        
        this.scene.add.text(width * 0.15, height - 120, '◀', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Правая зона для движения вправо (30% экрана справа)
        this.rightZone = this.scene.add.rectangle(width * 0.85, height - 120, width * 0.3, 100, 0x000000, 0.5)
            .setStrokeStyle(2, 0x00ff00)
            .setInteractive({ useHandCursor: true });
        
        this.scene.add.text(width * 0.85, height - 120, '▶', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Кнопка огня (центр снизу)
        this.fireButton = this.scene.add.circle(width / 2, height - 120, 60, 0xff0000, 0.7)
            .setStrokeStyle(3, 0xffffff)
            .setInteractive({ useHandCursor: true });
        
        this.scene.add.text(width / 2, height - 120, 'FIRE', {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'monospace',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // Флаги состояния
        this.moveLeftPressed = false;
        this.moveRightPressed = false;
        this.firePressed = false;
        
        // События для левой зоны
        this.leftZone.on('pointerdown', () => {
            this.moveLeftPressed = true;
        });
        this.leftZone.on('pointerup', () => {
            this.moveLeftPressed = false;
        });
        this.leftZone.on('pointerout', () => {
            this.moveLeftPressed = false;
        });
        
        // События для правой зоны
        this.rightZone.on('pointerdown', () => {
            this.moveRightPressed = true;
        });
        this.rightZone.on('pointerup', () => {
            this.moveRightPressed = false;
        });
        this.rightZone.on('pointerout', () => {
            this.moveRightPressed = false;
        });
        
        // События для кнопки огня
        this.fireButton.on('pointerdown', () => {
            this.firePressed = true;
        });
        this.fireButton.on('pointerup', () => {
            this.firePressed = false;
        });
        
        // Сброс всех флагов при отпускании пальца в любом месте
        this.scene.input.on('pointerup', () => {
            this.moveLeftPressed = false;
            this.moveRightPressed = false;
            this.firePressed = false;
        });
        
        // Визуальный фидбек при нажатии
        this.addButtonFeedback();
    }
    
    addButtonFeedback() {
        // Эффект нажатия для левой кнопки
        this.leftZone.on('pointerdown', () => {
            this.leftZone.setFillStyle(0x00ff00, 0.8);
            this.scene.time.delayedCall(100, () => {
                if (this.leftZone) this.leftZone.setFillStyle(0x000000, 0.5);
            });
        });
        
        // Эффект нажатия для правой кнопки
        this.rightZone.on('pointerdown', () => {
            this.rightZone.setFillStyle(0x00ff00, 0.8);
            this.scene.time.delayedCall(100, () => {
                if (this.rightZone) this.rightZone.setFillStyle(0x000000, 0.5);
            });
        });
        
        // Эффект нажатия для кнопки огня
        this.fireButton.on('pointerdown', () => {
            this.fireButton.setFillStyle(0xff6600, 0.9);
            this.fireButton.setScale(0.9);
            this.scene.time.delayedCall(100, () => {
                if (this.fireButton) {
                    this.fireButton.setFillStyle(0xff0000, 0.7);
                    this.fireButton.setScale(1);
                }
            });
        });
    }
    
    getMovement() {
        let direction = 0;
        if (this.moveLeftPressed) direction = -1;
        if (this.moveRightPressed) direction = 1;
        return direction;
    }
    
    isFirePressed() {
        const pressed = this.firePressed;
        this.firePressed = false; // Сбрасываем для одиночного выстрела
        return pressed;
    }
    
    destroy() {
        if (this.leftZone) this.leftZone.destroy();
        if (this.rightZone) this.rightZone.destroy();
        if (this.fireButton) this.fireButton.destroy();
    }
}