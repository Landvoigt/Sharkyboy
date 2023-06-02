class Character extends MovableObject {
    x = 60;
    y = 500;
    y_default = 500;
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
    isIdling = true;
    lastMovementTime = 0;

    constructor() {
        super().loadImage(CHARACTER_SWIMMING_IMG[0]);
        this.load();
        // this.applyGravity();
        this.animate();
    }

    load() {
        this.loadImages(CHARACTER_IDLE_IMG);
        this.loadImages(CHARACTER_SWIMMING_IMG);
        this.loadImages(CHARACTER_HURT_FROM_POISON_IMG);
        this.loadImages(CHARACTER_DEAD_FROM_POISON_IMG);
        this.loadImages(CHARACTER_FIN_SLAP_ATTACK_IMG);
        this.loadImages(CHARACTER_LONG_IDLE_IMG);
    }

    animate() {
        setInterval(() => {
            SWIMMING_SOUND.pause();
            this.getPositionOfCharacter();
            this.moveCharacterInAllDirections();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.playCharacterAnimations();
        }, this.animationTime);
        this.checkIdleTime();
    }

    moveCharacterInAllDirections() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x && !this.characterCollided) {
            this.moveRight();
            this.setMovementAttributes();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0 && !this.characterCollided) {
            this.moveLeft();
            this.setMovementAttributes();
            this.otherDirection = true;
        }
        if (this.world.keyboard.UP && this.y > 160 && !this.characterCollided) {
            this.moveUp();
            this.setMovementAttributes();
            this.y_default = this.y;
        }
        if (this.world.keyboard.DOWN && this.y < 660 && !this.characterCollided) {
            this.moveDown();
            this.setMovementAttributes();
            this.y_default = this.y;
        }
    }

    playCharacterAnimations() {
        if (this.isDead()) {
            this.world.gameOver();
        } else if (this.isHurt()) {
            this.playAnimation(CHARACTER_HURT_FROM_POISON_IMG);
        } else if (this.world.keyboard.JUMP) {
            this.animationTime = 30;
            this.playAnimation(CHARACTER_FIN_SLAP_ATTACK_IMG);
            this.lastMovementTime = new Date().getTime() / 1000;
        } else if (this.isSwimming()) {
            this.animationTime = 90;
            this.playAnimation(CHARACTER_SWIMMING_IMG);
        } else {
            if (this.isntMoving() && this.isIdling) {
                this.playAnimation(CHARACTER_LONG_IDLE_IMG);
            } else {
                this.isIdling = true;
                this.playAnimation(CHARACTER_IDLE_IMG);
            }
        }
    }

    checkIdleTime() {
        if (this.isIdling) {
            this.lastMovementTime = new Date().getTime() / 1000;
        } else {
            return
        }
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

    isSwimming() {
        return this.world.keyboard.RIGHT && !this.characterCollided ||
            this.world.keyboard.LEFT && !this.characterCollided ||
            this.world.keyboard.UP && !this.characterCollided ||
            this.world.keyboard.DOWN && !this.characterCollided;
    }

    setMovementAttributes() {
        SWIMMING_SOUND.play();
        this.inMovement = true;
        this.isIdling = false;
        this.lastMovementTime = new Date().getTime() / 1000;
    }

    isntMoving() {
        let timePassed = (new Date().getTime() / 1000) - this.lastMovementTime; // difference in ms
        console.log(timePassed);
        return timePassed > 2.5;
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

          // if (this.world.keyboard.JUMP && !this.isAboveGround()) {
            //     this.jump();
            // }