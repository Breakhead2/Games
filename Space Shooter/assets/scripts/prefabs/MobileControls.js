export class MobileControls {
    constructor(scene) {
        this.scene = scene;
        this.buttons = {};
        
        // Определяем, мобильное ли устройство
        this.isMobile = scene.isMobile();
        
        if (this.isMobile) {
            this.createButtons();
        }
    }
    
    createButtons() {
        const { width, height } = this.scene.scale;
        
        // Левая кнопка (движение влево)
        this.buttons.left = this.scene.add.rectangle(80, height - 80, 100, 100, 0x000000, 0.5)
            .setStrokeStyle(2, 0xffffff)
            .setInteractive({ useHandCursor: true });
        
        this.scene.add.text(80, height - 80, '←', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Правая кнопка (движение вправо)
        this.buttons.right = this.scene.add.rectangle(width - 80, height - 80, 100, 100, 0x000000, 0.5)
            .setStrokeStyle(2, 0xffffff)
            .setInteractive({ useHandCursor: true });
        
        this.scene.add.text(width - 80, height - 80, '→', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);
        
        // Кнопка стрельбы
        this.buttons.shoot = this.scene.add.rectangle(width / 2, height - 80, 120, 100, 0x000000, 0.5)
            .setStrokeStyle(2, 0xffffff)
            .setInteractive({ useHandCursor: true });
        
        this.scene.add.text(width / 2, height - 80, 'FIRE', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        // Настройка событий для левой кнопки
        this.buttons.left.on('pointerdown', () => {
            this.moveLeft = true;
        });
        this.buttons.left.on('pointerup', () => {
            this.moveLeft = false;
        });
        this.buttons.left.on('pointerout', () => {
            this.moveLeft = false;
        });
        
        // Настройка событий для правой кнопки
        this.buttons.right.on('pointerdown', () => {
            this.moveRight = true;
        });
        this.buttons.right.on('pointerup', () => {
            this.moveRight = false;
        });
        this.buttons.right.on('pointerout', () => {
            this.moveRight = false;
        });
        
        // Настройка событий для стрельбы
        this.buttons.shoot.on('pointerdown', () => {
            this.shootPressed = true;
        });
        this.buttons.shoot.on('pointerup', () => {
            this.shootPressed = false;
        });
        
        // Добавляем обработчики для отмены при перетаскивании
        this.scene.input.on('pointerup', () => {
            this.moveLeft = false;
            this.moveRight = false;
            this.shootPressed = false;
        });
    }
    
    getMovement() {
        let direction = 0;
        if (this.moveLeft) direction = -1;
        if (this.moveRight) direction = 1;
        return direction;
    }
    
    isShooting() {
        const shooting = this.shootPressed;
        this.shootPressed = false; // Одиночный выстрел
        return shooting;
    }
    
    destroy() {
        if (this.buttons.left) this.buttons.left.destroy();
        if (this.buttons.right) this.buttons.right.destroy();
        if (this.buttons.shoot) this.buttons.shoot.destroy();
    }
}