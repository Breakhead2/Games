export class EnemyBullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        let texture = 'enemies_bullet';
        let frame = 'bullet-red';
        let speed = 300;
        
        switch(type) {
            case 'bullet-red':
                frame = 'bullet-red';
                break;
            case 'bullet-blue':
                frame = 'bullet-blue';
                speed = 400;
                break;
            case 'bullet-yellow':
                frame = 'bullet-yellow';
                speed = 500;
                break;
            default:
                frame = 'bullet-red';
        }
        
        super(scene, x, y, texture, frame);
        
        this.scene = scene;
        this.type = type;
        this.speed = speed;
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = false;
        this.setVisible(false);
        this.setActive(false);
        this.setDisplaySize(50, 40);
        this.body.setSize(50, 40);
    }
    
    activate(x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.isActive = true;
        this.body.setVelocityY(this.speed);
    }
    
    deactivate() {
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
        this.isActive = false;
        this.body.setVelocity(0, 0);
    }
    
    update() {
        if (this.isActive && this.y > this.scene.scale.height + 50) {
            this.deactivate();
        }
    }
}