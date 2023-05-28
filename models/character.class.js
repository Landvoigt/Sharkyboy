class Character extends MovableObject {
    x = 60;
    y = 500;
    height = 500;
    width = 500;
    hp = 100;
    speed = 10;
    world;
    // isSwimming = false;
    IDLE_IMG = [
        '../img/character/idle/(1).png',
        '../img/character/idle/(1).png',
        '../img/character/idle/(2).png',
        '../img/character/idle/(3).png',
        '../img/character/idle/(4).png',
        '../img/character/idle/(5).png',
        '../img/character/idle/(6).png',
        '../img/character/idle/(7).png',
        '../img/character/idle/(8).png',
        '../img/character/idle/(9).png',
        '../img/character/idle/(10).png',
        '../img/character/idle/(11).png',
        '../img/character/idle/(12).png',
        '../img/character/idle/(13).png',
        '../img/character/idle/(14).png',
        '../img/character/idle/(15).png',
        '../img/character/idle/(16).png',
        '../img/character/idle/(17).png',
        '../img/character/idle/(18).png'
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
        // '../img/character/hurt/poisoned/(4).png',
    ];
    SWIMMING_SOUND = new Audio('../sounds/sharky_swim.mp3');
    characterIdle = true;
    animationTime = 135;


    constructor() {
        super().loadImage(this.SWIMMING_IMG[0]);
        this.loadImages(this.IDLE_IMG);
        this.loadImages(this.SWIMMING_IMG);
        this.loadImages(this.HURT_FROM_POISON_IMG);
        this.loadImages(this.DEAD_FROM_POISON_IMG);
        this.applyGravity();
        // this.checkCharacterHP();
        // if (characterAlive) {
            this.animate();
        // }
    }

    animate() {

        setInterval(() => {
            this.getPositionOfCharacter();
            this.SWIMMING_SOUND.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.moveRight();
                this.otherDirection = false;
                this.SWIMMING_SOUND.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.SWIMMING_SOUND.play();
            }
            if (this.world.keyboard.JUMP && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        this.playAnimations();
    }

    playAnimations() {
        let i = 0;
        setInterval(() => {
            this.characterIdle = true;
            if (this.isDead()) {
                this.deadAnimation();
                characterAlive = false;
            } else if (this.isHurt() && i < 3) {
                this.hurtAnimation();
                this.characterCollided = false;
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.characterCollided) {
                this.playAnimation(this.SWIMMING_IMG, 0);
                this.characterIdle = false;
                this.currentImage[6] = 0;
            } else if (this.characterIdle) {
                this.playAnimation(this.IDLE_IMG, 6);
            }
            i++;
            if (this.characterCollided) {
                i = 0;
            }
        }, this.animationTime);
    }

    deadAnimation() {
        if (this.currentImage[2] <= 10) {
            console.log(this.currentImage);
            this.playAnimation(this.DEAD_FROM_POISON_IMG, 2);
            // resetImageID();
        }
    }

    hurtAnimation() {
        if (this.currentImage[1] < 3) {
            this.playAnimation(this.HURT_FROM_POISON_IMG, 1);
        }
        if (this.currentImage[1] == 3) {
            // this.playAnimation(this.SWIMMING_IMG, 0);
        }
        console.log(this.currentImage);
    }

    jump() {
        this.fallSpeed = 30;
    }

    getPositionOfCharacter() {
        characterPosition = this.x;
    }
}