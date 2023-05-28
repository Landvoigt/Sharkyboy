class Character extends MovableObject {
    x = 60;
    y = 500;
    height = 500;
    width = 500;
    hp = 100;
    speed = 10;
    world;
    // isSwimming = false;
    characterIdle = true;
    animationTime = 135;


    constructor() {
        super().loadImage(CHARACTER_SWIMMING_IMG[0]);
        this.loadImages(CHARACTER_IDLE_IMG);
        this.loadImages(CHARACTER_SWIMMING_IMG);
        this.loadImages(CHARACTER_HURT_FROM_POISON_IMG);
        this.loadImages(CHARACTER_DEAD_FROM_POISON_IMG);
        this.applyGravity();
        // this.checkCharacterHP();
        // if (characterAlive) {
        this.animate();
        // }
    }

    animate() {

        setInterval(() => {
            this.getPositionOfCharacter();
            SWIMMING_SOUND.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.moveRight();
                this.otherDirection = false;
                SWIMMING_SOUND.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                SWIMMING_SOUND.play();
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
                GAMEOVER_SOUND.play();
            } else if (this.isHurt() && i < 3) {
                this.hurtAnimation();
                this.characterCollided = false;
                HURT_SOUND.play();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.characterCollided) {
                this.playAnimation(CHARACTER_SWIMMING_IMG, 0);
                this.characterIdle = false;
                this.currentImage[6] = 0;
            } else if (this.characterIdle) {
                this.playAnimation(CHARACTER_IDLE_IMG, 6);
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
            this.playAnimation(CHARACTER_DEAD_FROM_POISON_IMG, 2);
            // resetImageID();
        }
    }

    hurtAnimation() {
        if (this.currentImage[1] < 3) {
            this.playAnimation(CHARACTER_HURT_FROM_POISON_IMG, 1);
        }
        if (this.currentImage[1] == 3) {
            // this.playAnimation(CHARACTER_SWIMMING_IMG, 0);
        }
        // console.log(this.currentImage);
    }

    jump() {
        this.fallSpeed = 30;
    }

    getPositionOfCharacter() {
        characterPosition = this.x;
        if (characterPosition > 3000) {
            ENDGAME_MUSIC.play();
            setTimeout(this.fadeOutMusic, 3200);
        } else if (characterPosition < 3000) {
            setTimeout(this.fadeOutEndgameMusic, 2000);
            GAME_MUSIC.play();
        }
    }

    fadeOutMusic() {
        GAME_MUSIC.pause();
    }

    fadeInMusic() {
        GAME_MUSIC.play();
    }

    fadeOutEndgameMusic() {
        ENDGAME_MUSIC.pause();
    }
}