// prefabs/MobileControls.js
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
        const buttonY = height - 100;
        
        // ========== ЛЕВАЯ КНОПКА (ДВИЖЕНИЕ ВЛЕВО) ==========
        // Тень
        this.leftShadow = this.scene.add.circle(width * 0.15, buttonY + 5, 60, 0x000000, 0.4);
        // Основная кнопка
        this.leftZone = this.scene.add.circle(width * 0.15, buttonY, 60, 0x1a1a2e, 0.9)
            .setStrokeStyle(3, 0x00ff88)
            .setInteractive({ useHandCursor: true });
        
        // Иконка
        this.leftIcon = this.scene.add.text(width * 0.15, buttonY, '◀', {
            fontSize: '52px',
            color: '#00ff88',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        // ========== ПРАВАЯ КНОПКА (ДВИЖЕНИЕ ВПРАВО) ==========
        // Тень
        this.rightShadow = this.scene.add.circle(width * 0.85, buttonY + 5, 60, 0x000000, 0.4);
        // Основная кнопка
        this.rightZone = this.scene.add.circle(width * 0.85, buttonY, 60, 0x1a1a2e, 0.9)
            .setStrokeStyle(3, 0x00ff88)
            .setInteractive({ useHandCursor: true });
        
        // Иконка
        this.rightIcon = this.scene.add.text(width * 0.85, buttonY, '▶', {
            fontSize: '52px',
            color: '#00ff88',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        // ========== КНОПКА ОГНЯ (FIRE) ==========
        // Тень
        this.fireShadow = this.scene.add.circle(width / 2, buttonY + 5, 70, 0x000000, 0.4);
        // Основная кнопка
        this.fireButton = this.scene.add.circle(width / 2, buttonY, 70, 0x8b0000, 0.9)
            .setStrokeStyle(4, 0xff4444)
            .setInteractive({ useHandCursor: true });
        
        // Внутренний круг (эффект блика)
        this.fireInner = this.scene.add.circle(width / 2, buttonY - 5, 50, 0xcc0000, 0.5);
        
        // Текст на кнопке огня
        this.fireText = this.scene.add.text(width / 2, buttonY, 'FIRE', {
            fontSize: '28px',
            color: '#ffffff',
            fontFamily: 'PressStart2P',
            fontWeight: 'bold'
        }).setOrigin(0.5);
        
        // ========== ТЕКСТОВЫЕ ПОДПИСИ ==========
        this.leftLabel = this.scene.add.text(width * 0.15, buttonY - 85, 'LEFT', {
            fontSize: '14px',
            color: '#888888',
            fontFamily: 'PressStart2P'
        }).setOrigin(0.5);
        
        this.rightLabel = this.scene.add.text(width * 0.85, buttonY - 85, 'RIGHT', {
            fontSize: '14px',
            color: '#888888',
            fontFamily: 'PressStart2P'
        }).setOrigin(0.5);
        
        this.fireLabel = this.scene.add.text(width / 2, buttonY - 100, 'SHOOT', {
            fontSize: '12px',
            color: '#ff8888',
            fontFamily: 'PressStart2P'
        }).setOrigin(0.5);
        
        // Флаги состояния
        this.moveLeftPressed = false;
        this.moveRightPressed = false;
        this.firePressed = false;
        
        // ========== СОБЫТИЯ ДЛЯ ЛЕВОЙ КНОПКИ ==========
        this.leftZone.on('pointerdown', () => {
            this.moveLeftPressed = true;
            this.leftZone.setFillStyle(0x00ff88, 0.8);
            this.leftZone.setScale(0.95);
            this.leftIcon.setColor('#ffffff');
            this.leftIcon.setScale(0.95);
        });
        
        this.leftZone.on('pointerup', () => {
            this.moveLeftPressed = false;
            this.leftZone.setFillStyle(0x1a1a2e, 0.9);
            this.leftZone.setScale(1);
            this.leftIcon.setColor('#00ff88');
            this.leftIcon.setScale(1);
        });
        
        this.leftZone.on('pointerout', () => {
            this.moveLeftPressed = false;
            this.leftZone.setFillStyle(0x1a1a2e, 0.9);
            this.leftZone.setScale(1);
            this.leftIcon.setColor('#00ff88');
            this.leftIcon.setScale(1);
        });
        
        // ========== СОБЫТИЯ ДЛЯ ПРАВОЙ КНОПКИ ==========
        this.rightZone.on('pointerdown', () => {
            this.moveRightPressed = true;
            this.rightZone.setFillStyle(0x00ff88, 0.8);
            this.rightZone.setScale(0.95);
            this.rightIcon.setColor('#ffffff');
            this.rightIcon.setScale(0.95);
        });
        
        this.rightZone.on('pointerup', () => {
            this.moveRightPressed = false;
            this.rightZone.setFillStyle(0x1a1a2e, 0.9);
            this.rightZone.setScale(1);
            this.rightIcon.setColor('#00ff88');
            this.rightIcon.setScale(1);
        });
        
        this.rightZone.on('pointerout', () => {
            this.moveRightPressed = false;
            this.rightZone.setFillStyle(0x1a1a2e, 0.9);
            this.rightZone.setScale(1);
            this.rightIcon.setColor('#00ff88');
            this.rightIcon.setScale(1);
        });
        
        // ========== СОБЫТИЯ ДЛЯ КНОПКИ ОГНЯ ==========
        this.fireButton.on('pointerdown', () => {
            this.firePressed = true;
            this.fireButton.setFillStyle(0xff4444, 0.9);
            this.fireButton.setScale(0.95);
            this.fireInner.setScale(0.8);
            this.fireText.setScale(0.95);
            this.fireText.setColor('#ffff00');
            
            // Эффект вспышки
            this.scene.tweens.add({
                targets: this.fireButton,
                alpha: 0.7,
                duration: 50,
                yoyo: true
            });
        });
        
        this.fireButton.on('pointerup', () => {
            this.firePressed = false;
            this.fireButton.setFillStyle(0x8b0000, 0.9);
            this.fireButton.setScale(1);
            this.fireInner.setScale(1);
            this.fireText.setScale(1);
            this.fireText.setColor('#ffffff');
        });
        
        this.fireButton.on('pointerout', () => {
            this.firePressed = false;
            this.fireButton.setFillStyle(0x8b0000, 0.9);
            this.fireButton.setScale(1);
            this.fireInner.setScale(1);
            this.fireText.setScale(1);
            this.fireText.setColor('#ffffff');
        });
        
        // Анимация пульсации для кнопки FIRE
        this.scene.tweens.add({
            targets: [this.fireButton, this.fireInner],
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Сброс всех флагов при отпускании пальца
        this.scene.input.on('pointerup', () => {
            this.moveLeftPressed = false;
            this.moveRightPressed = false;
            // firePressed не сбрасываем здесь, чтобы выстрел точно сработал
        });
        
        // Адаптация под разные размеры экрана
        this.scene.scale.on('resize', () => this.resizeControls(), this);
    }
    
    resizeControls() {
        const { width, height } = this.scene.scale;
        const buttonY = height - 100;
        
        // Левая кнопка
        if (this.leftShadow) this.leftShadow.setPosition(width * 0.15, buttonY + 5);
        if (this.leftZone) this.leftZone.setPosition(width * 0.15, buttonY);
        if (this.leftIcon) this.leftIcon.setPosition(width * 0.15, buttonY);
        if (this.leftLabel) this.leftLabel.setPosition(width * 0.15, buttonY - 85);
        
        // Правая кнопка
        if (this.rightShadow) this.rightShadow.setPosition(width * 0.85, buttonY + 5);
        if (this.rightZone) this.rightZone.setPosition(width * 0.85, buttonY);
        if (this.rightIcon) this.rightIcon.setPosition(width * 0.85, buttonY);
        if (this.rightLabel) this.rightLabel.setPosition(width * 0.85, buttonY - 85);
        
        // Кнопка огня
        if (this.fireShadow) this.fireShadow.setPosition(width / 2, buttonY + 5);
        if (this.fireButton) this.fireButton.setPosition(width / 2, buttonY);
        if (this.fireInner) this.fireInner.setPosition(width / 2, buttonY - 5);
        if (this.fireText) this.fireText.setPosition(width / 2, buttonY);
        if (this.fireLabel) this.fireLabel.setPosition(width / 2, buttonY - 100);
    }
    
    getMovement() {
        let direction = 0;
        if (this.moveLeftPressed) direction = -1;
        if (this.moveRightPressed) direction = 1;
        return direction;
    }
    
    isFirePressed() {
        const pressed = this.firePressed;
        this.firePressed = false;
        return pressed;
    }
    
    destroy() {
        if (this.leftShadow) this.leftShadow.destroy();
        if (this.leftZone) this.leftZone.destroy();
        if (this.leftIcon) this.leftIcon.destroy();
        if (this.leftLabel) this.leftLabel.destroy();
        
        if (this.rightShadow) this.rightShadow.destroy();
        if (this.rightZone) this.rightZone.destroy();
        if (this.rightIcon) this.rightIcon.destroy();
        if (this.rightLabel) this.rightLabel.destroy();
        
        if (this.fireShadow) this.fireShadow.destroy();
        if (this.fireButton) this.fireButton.destroy();
        if (this.fireInner) this.fireInner.destroy();
        if (this.fireText) this.fireText.destroy();
        if (this.fireLabel) this.fireLabel.destroy();
    }
}