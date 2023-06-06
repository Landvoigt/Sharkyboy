class Character extends MovableObject {
    x = 60;
    y = 500;
    width = 500;
    height = 500;
    offset = {
        x: 101,
        height: 118,
        y: 234,
        width: 102,
    };
    x_default = 60;
    y_default = 500;
    y_min = -100;
    y_max = 660;
    hp = 100;
    speed = 10;
    world;
    animationTime = 135;
    isIdling = true;
    lastMovementTime = 0;
    isSlapping = false;
    currentAttackCount = 0;
    attackingInterval = stopAttackTimer - startAttackTimer;
    lastAttackTime = 0;

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

    playCharacterAnimations(i) {
        if (this.isDead()) {
            this.world.gameOver();
        } else if (this.isHurt()) {
            this.playAnimation(CHARACTER_HURT_FROM_POISON_IMG);
        } else if (this.isAttacking()) {
            this.slapAnimation();
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

    isAttacking() {
        return this.world.keyboard.SPACEBAR && this.attackingInterval + (this.currentAttackCount * 80) < 640;
    }

    slapAnimation() {
        if (this.currentAttackCount == 0) {
            this.currentImage = 0;
        }
        this.currentAttackCount++;
        this.animationTime = 80;
        this.playAnimation(CHARACTER_FIN_SLAP_ATTACK_IMG);
        if (this.currentAttackCount == CHARACTER_FIN_SLAP_ATTACK_IMG.length) {
            setTimeout(this.resetAttackCount, 500);
        }
        // SLAP_SOUND.play();
    }

    getPositionOfCharacter() {
        characterPosition = this.x;
        if (characterPosition > 3000) {
            playSound(ENDGAME_MUSIC);
            setTimeout(stopSound, 3200, GAME_MUSIC);
        }
        else if (characterPosition < 3000 && this.endbossReached) {
            playSound(GAME_MUSIC);
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
        this.inMovement = true;
        this.isIdling = false;
        this.lastMovementTime = new Date().getTime() / 1000;
    }

    isntMoving() {
        let timePassed = (new Date().getTime() / 1000) - this.lastMovementTime;
        return timePassed > 2.5;
    }

    resetAttackCount() {
        this.currentAttackCount = 0;
    }
}