class Character extends MovableObject {
    x = 100;
    y = 0;
    height = 500;
    width = 500;
    hp = 100;
    speed = 10;
    world;
    isSwimming = false;
    IDLE_IMG = [
        '../img/1.Sharkie/1.IDLE/1.png',
        '../img/1.Sharkie/1.IDLE/2.png',
        '../img/1.Sharkie/1.IDLE/3.png',
        '../img/1.Sharkie/1.IDLE/4.png',
        '../img/1.Sharkie/1.IDLE/5.png',
        '../img/1.Sharkie/1.IDLE/6.png',
        '../img/1.Sharkie/1.IDLE/7.png',
        '../img/1.Sharkie/1.IDLE/8.png',
        '../img/1.Sharkie/1.IDLE/9.png',
        '../img/1.Sharkie/1.IDLE/10.png',
        '../img/1.Sharkie/1.IDLE/11.png',
        '../img/1.Sharkie/1.IDLE/12.png',
        '../img/1.Sharkie/1.IDLE/13.png',
        '../img/1.Sharkie/1.IDLE/14.png',
        '../img/1.Sharkie/1.IDLE/15.png',
        '../img/1.Sharkie/1.IDLE/16.png',
        '../img/1.Sharkie/1.IDLE/17.png',
        '../img/1.Sharkie/1.IDLE/18.png'
    ];
    SWIMMING_IMG = [
        '../img/character/swim/(1).png',
        '../img/character/swim/(2).png',
        '../img/character/swim/(3).png',
        '../img/character/swim/(4).png',
        '../img/character/swim/(5).png',
        '../img/character/swim/(6).png'
    ];
    DEAD_FROM_POISON_IMG = [
        '../img/character/dead/poisoned/(1).png',
        '../img/character/dead/poisoned/(2).png',
        '../img/character/dead/poisoned/(3).png',
        '../img/character/dead/poisoned/(4).png',
        '../img/character/dead/poisoned/(5).png',
        '../img/character/dead/poisoned/(6).png',
        '../img/character/dead/poisoned/(7).png',
        '../img/character/dead/poisoned/(8).png',
        '../img/character/dead/poisoned/(9).png',
        '../img/character/dead/poisoned/(10).png'
    ];
    HURT_FROM_POISON_IMG = [
        '../img/character/hurt/poisoned/(1).png',
        '../img/character/hurt/poisoned/(2).png',
        '../img/character/hurt/poisoned/(3).png',
        '../img/character/hurt/poisoned/(4).png',
    ];
    SWIMMING_SOUND = new Audio('../sounds/sharky_swim.mp3');


    constructor() {
        super().loadImage(this.SWIMMING_IMG[0]);
        this.loadImages(this.SWIMMING_IMG);
        this.loadImages(this.HURT_FROM_POISON_IMG);
        this.loadImages(this.DEAD_FROM_POISON_IMG);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.SWIMMING_SOUND.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.moveRight();
                this.isSwimming = true;
                this.otherDirection = false;
                this.SWIMMING_SOUND.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.isSwimming = true;
                this.otherDirection = true;
                this.SWIMMING_SOUND.play();
            }
            if (this.world.keyboard.JUMP && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
            this.isSwimming = false;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                // this.playAnimationOnce(this.DEAD_FROM_POISON_IMG);  
            } else if (this.isHurt()) {
                // this.playAnimationOnce(this.HURT_FROM_POISON_IMG);
            }
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.SWIMMING_IMG);
                }
            }
        }, 90);
    }

    jump() {
        this.fallSpeed = 30;
    }
}