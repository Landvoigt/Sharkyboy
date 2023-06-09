class Character extends MovableObject {
    x = 60;
    y = 500;
    width = 500;
    height = 500;
    offset = {
        x: 101,
        width: 102,
        y: 234,
        height: 118,
    };
    x_default = 60;
    y_default = 500;
    y_min = -100;
    y_max = 660;
    hp = 100;
    speed = 9;
    animationTime = 130;
    lastMovementTime = 0;
    attackAnimationCount = 0;
    deadAnimationCount = 0;
    world;
    animationTimeout = null;
    isIdling = true;
    isAttacking = false;

    constructor() {
        super().loadImage(CHARACTER_SWIMMING_IMG[0]);
        this.load();
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

        this.checkIdleTime();
        this.startAnimationTimer();
    }

    startAnimationTimer() {
        if (characterAlive) {
            this.animationTimeout = setTimeout(() => {
                this.playCharacterAnimations();
                this.startAnimationTimer(); // renew timer
            }, this.animationTime);
        }
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
        if (this.world.keyboard.UP && this.y > this.y_min && !this.characterCollided) {
            this.moveUp();
            this.setMovementAttributes();
            this.y_default = this.y;
        }
        if (this.world.keyboard.DOWN && this.y < this.y_max && !this.characterCollided) {
            this.moveDown();
            this.setMovementAttributes();
            this.y_default = this.y;
        }
    }

    playCharacterAnimations() {
        if (this.isDead()) {
            this.world.gameOver();
        } else if (this.isHurt()) {
            this.changeAnimationTime(130);
            this.playAnimation(CHARACTER_HURT_FROM_POISON_IMG);
        } else if (this.canAttack()) {
            this.changeAnimationTime(65);
            this.slapAnimation();
            this.lastMovementTime = new Date().getTime() / 1000;
        } else if (this.isSwimming()) {
            this.changeAnimationTime(90);
            this.playAnimation(CHARACTER_SWIMMING_IMG);
        } else {
            this.changeAnimationTime(130);
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
        setInterval(() => {
            if (this.deadAnimationCount == 0) {
                this.currentImage = 0;
            }
            if (this.deadAnimationCount <= 9) {
                this.playAnimation(CHARACTER_DEAD_FROM_POISON_IMG);
            }
            this.deadAnimationCount++;
        }, 120);
    }

    canAttack() {
        return this.world.keyboard.SPACEBAR && startAttackTimer > stopAttackTimer && this.attackAnimationCount <= 7;
    }

    slapAnimation() {
        if (this.attackAnimationCount == 0) {
            this.currentImage = 0;
        }
        if (this.attackAnimationCount == 1) {
            this.isAttacking = true;
        }
        if (this.attackAnimationCount == 4) {
            SLAP_SOUND.play();
        }
        if (this.attackAnimationCount == 6) {
            this.isAttacking = false;
        }
        this.attackAnimationCount++;
        this.playAnimation(CHARACTER_FIN_SLAP_ATTACK_IMG);
    }

    getPositionOfCharacter() {
        characterPosition = this.x;
        if (characterPosition > 3000) {
            playSound(ENDGAME_MUSIC);
            setTimeout(stopSound, 3200, GAME_MUSIC);
        }
        else if (characterPosition < 3000 && endbossReached) {
            // playSound(GAME_MUSIC);
            setTimeout(stopSound, 2000, ENDGAME_MUSIC);
            // ENDGAME_MUSIC.pause();
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
        this.isIdling = false;
        this.lastMovementTime = new Date().getTime() / 1000;
    }

    isntMoving() {
        let timePassed = (new Date().getTime() / 1000) - this.lastMovementTime;
        return timePassed > 2.5;
    }

    resetAttackCount() {
        this.attackAnimationCount = 0;
    }

    changeAnimationTime(ms) {
        this.animationTime = ms;
    }
}