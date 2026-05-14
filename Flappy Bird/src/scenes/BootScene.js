import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
        this.isOverlayVisible = false; // Флаг для отслеживания состояния
    }

    create() {
        // Отключаем контекстное меню (ПК: правый клик)
        this.game.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Слушаем изменение ориентации
        this.scale.on('orientationchange', this.handleOrientation, this);
        
        // Проверяем текущую ориентацию (с задержкой, чтобы scale успел инициализироваться)
        this.time.delayedCall(100, () => {
            this.handleOrientation(this.scale.orientation);
        });
        
        // Переходим в меню
        this.scene.start('MenuScene');
    }

    handleOrientation(orientation) {
        // Нормализуем ориентацию (учитываем, что может быть undefined)
        const isLandscape = orientation === 'landscape-primary' || 
                           orientation === 'landscape-secondary' ||
                           (window.innerWidth > window.innerHeight);
        
        if (!isLandscape && !this.isOverlayVisible) {
            this.showRotateOverlay();
        } else if (isLandscape && this.isOverlayVisible) {
            this.hideRotateOverlay();
        }
    }

    showRotateOverlay() {
        if (document.getElementById('rotate-overlay')) return;
        
        this.isOverlayVisible = true;
        
        const overlay = document.createElement('div');
        overlay.id = 'rotate-overlay';
        overlay.innerHTML = `
            <div class="rotate-overlay-content">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <h2>Поверните устройство</h2>
                <p>Игра работает только в<br>горизонтальной ориентации</p>
            </div>
        `;
        
        // Блокируем все Pointer Events на оверлее, чтобы игрок не мог кликнуть сквозь
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.95)';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.color = 'white';
        overlay.style.fontFamily = 'Arial, sans-serif';
        overlay.style.textAlign = 'center';
        overlay.style.gap = '20px';
        
        document.body.appendChild(overlay);
        
        // Приостанавливаем все активные сцены
        const activeScenes = this.scene.manager.getScenes(true); // Получаем активные сцены
        activeScenes.forEach(scene => {
            if (scene.scene.isActive()) {
                scene.scene.pause();
            }
        });
    }

    hideRotateOverlay() {
        const overlay = document.getElementById('rotate-overlay');
        if (overlay) {
            overlay.remove();
            this.isOverlayVisible = false;
            
            // Возобновляем все приостановленные сцены
            const pausedScenes = this.scene.manager.getScenes(false); // Получаем все сцены
            pausedScenes.forEach(scene => {
                if (scene.scene.isPaused()) {
                    scene.scene.resume();
                }
            });
        }
    }
}