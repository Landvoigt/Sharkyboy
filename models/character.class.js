class Character extends MovableObject {
    x = 60;
    y = 500;
    height = 500;
    width = 500;
    offset = {
        top: 358,
        bottom: 234,
        left: 202,
        right: 101,
    };
    hp = 100;
    speed = 10;
    world;
    animationTime = 135;


    constructor() {
        super().loadImage(CHARACTER_SWIMMING_IMG[0]);
        this.loadImages(CHARACTER_IDLE_IMG);
        this.loadImages(CHARACTER_SWIMMING_IMG);
        this.loadImages(CHARACTER_HURT_FROM_POISON_IMG);
        this.loadImages(CHARACTER_DEAD_FROM_POISON_IMG);
        this.applyGravity();
        this.animate();
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
        setInterval(() => {
            if (this.isDead()) {
                this.world.gameOver();
            } else if (this.isHurt()) {
                this.playAnimation(CHARACTER_HURT_FROM_POISON_IMG);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.characterCollided) {
                this.animationTime = 90;
                this.playAnimation(CHARACTER_SWIMMING_IMG);
            } else {
                this.playAnimation(CHARACTER_IDLE_IMG);
            }
        }, this.animationTime);
    }

    deadAnimation() {
        if (!characterAlive) {
            let i = 1;
            setInterval(() => {
                if (i <= 10) {
                    this.playAnimation(CHARACTER_DEAD_FROM_POISON_IMG);
                }
                i++;
            }, 120);
        }
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
            // GAME_MUSIC.play();
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