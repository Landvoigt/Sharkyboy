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
    y_min = 60;
    y_max = 640;
    hp = 100;
    speed = 9;
    animationTime = 130;
    timeUntilSleepAnimation = 2.5;
    lastMovementTime = 0;
    attackAnimationCount = 0;
    bubbleAnimationCount = 0;
    deadAnimationCount = 0;
    world;
    animationTimeout = null;
    isIdling = true;
    isAttacking = false;
    bubbleAnimationTimeout = false;

    constructor() {
        super().loadImage(CHARACTER_SWIMMING_IMG[0]);
        this.load();
        this.animate();
    }


    /**
     * preloads all character imgs
     */
    load() {
        this.loadImages(CHARACTER_IDLE_IMG);
        this.loadImages(CHARACTER_SWIMMING_IMG);
        this.loadImages(CHARACTER_HURT_FROM_POISON_IMG);
        this.loadImages(CHARACTER_DEAD_FROM_POISON_IMG);
        this.loadImages(CHARACTER_FIN_SLAP_ATTACK_IMG);
        this.loadImages(CHARACTER_BUBBLE_ATTACK_IMG);
        this.loadImages(CHARACTER_LONG_IDLE_IMG);
    }


    /**
     * animates the character
     */
    animate() {
        setInterval(() => {
            stopSound(SWIMMING_SOUND);
            this.checkCharacterPosition();
            this.moveCharacterInAllDirections();
            this.repositionCamera();
        }, 1000 / 60);

        this.checkIdleTime();
        this.startAnimationTimer();
    }


    /**
     * checks x position of character to adjust music
     */
    checkCharacterPosition() {
        this.getCharacterPosition();
        if (this.enterEndzone()) {
            ENDGAME_MUSIC.volume = 0.3;
            playSound(ENDGAME_MUSIC);
            stopSound(GAME_MUSIC);
        }
        if (this.leaveEndzone()) {
            playSound(GAME_MUSIC);
            stopSound(ENDGAME_MUSIC);
        }
    }


    moveCharacterInAllDirections() {
        if (this.canMoveRight()) {
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
        }
        if (this.canMoveUp()) {
            this.moveUp();
        }
        if (this.canMoveDown()) {
            this.moveDown();
        }
    }

    moveRight() {
        super.moveRight();
        this.setMovementAttributes();
        this.otherDirection = false;
    }

    moveLeft() {
        super.moveLeft();
        this.setMovementAttributes();
        this.otherDirection = true;
    }

    moveUp() {
        super.moveUp();
        this.setMovementAttributes();
        this.y_default = this.y;
    }

    moveDown() {
        super.moveDown();
        this.setMovementAttributes();
        this.y_default = this.y;
    }

    setMovementAttributes() {
        playSound(SWIMMING_SOUND);
        this.isIdling = false;
        this.lastMovementTime = new Date().getTime() / 1000;
    }

    repositionCamera() {
        this.world.camera_x = -this.x + 180;
    }

    checkIdleTime() {
        if (this.isIdling) {
            this.lastMovementTime = new Date().getTime() / 1000;
        }
    }

    startAnimationTimer() {
        if (characterAlive) {
            this.animationTimeout = setTimeout(() => {
                this.playCharacterAnimations();
                this.startAnimationTimer(); // renew timer
            }, this.animationTime);
        }
    }

    playCharacterAnimations() {
        if (this.isDead()) {
            this.world.gameOver();
        } else if (this.isHurt()) {
            this.changeAnimationTime(130);
            this.playAnimation(CHARACTER_HURT_FROM_POISON_IMG);
        } else if (this.canDoBubble()) {
            this.changeAnimationTime(130);
            this.bubbleAnimation();
        } else if (this.canAttack()) {
            this.changeAnimationTime(65);
            this.slapAnimation();
        } else if (this.isSwimming()) {
            this.changeAnimationTime(90);
            this.playAnimation(CHARACTER_SWIMMING_IMG);
        } else {
            this.changeAnimationTime(130);
            if (this.isntMoving() && this.isIdling) {
                this.playAnimation(CHARACTER_LONG_IDLE_IMG);
            } else {
                this.isIdling = true;
                this.bubbleAnimationCount = 0;
                this.playAnimation(CHARACTER_IDLE_IMG);
            }
        }
    }

    changeAnimationTime(ms) {
        this.animationTime = ms;
    }

    bubbleAnimation() {
        if (this.bubbleAnimationStarted()) {
            this.resetCurrentImage();
            this.world.statusBarPoison.setPercentage(collectedPoison * 20);
        }
        if (this.bubbleAnimationRunning()) {
            playSound(BUBBLE_BLOW_SOUND);
        }
        if (this.bubbleAnimationEnded()) {
            this.world.createBubble();
            playSound(BUBBLE_POP_SOUND);
            collectedPoison--;
            this.bubbleAnimationTimeout = true;
        }
        this.bubbleAnimationCount++;
        this.playAnimation(CHARACTER_BUBBLE_ATTACK_IMG);
        this.lastMovementTime = new Date().getTime() / 1000;
    }

    slapAnimation() {
        if (this.slapAnimationStarted()) {
            this.resetCurrentImage();
        }
        if (this.slapAnimationAttackStarted()) {
            this.isAttacking = true;
        }
        if (this.slapAnimationRunning()) {
            playSound(SLAP_SOUND);
        }
        if (this.slapAnimationEnded()) {
            this.isAttacking = false;
        }
        this.attackAnimationCount++;
        this.playAnimation(CHARACTER_FIN_SLAP_ATTACK_IMG);
        this.lastMovementTime = new Date().getTime() / 1000;
    }

    deadAnimation() {
        setInterval(() => {
            if (this.deadAnimationStarted()) {
                this.resetCurrentImage();
            }
            if (this.deadAnimationRunning()) {
                this.playAnimation(CHARACTER_DEAD_FROM_POISON_IMG);
            }
            this.deadAnimationCount++;
        }, 120);
    }

    getCharacterPosition() {
        characterPosition = this.x;
    }

    enterEndzone() {
        return characterPosition > this.world.level.levelEndzoneStart_x;
    }

    leaveEndzone() {
        return characterPosition < this.world.level.levelEndzoneStart_x && endbossReached;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x && !this.characterCollided;
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.levelStart_x && !this.characterCollided;
    }

    canMoveUp() {
        return this.world.keyboard.UP && this.y > this.y_min && !this.characterCollided;
    }

    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < this.y_max && !this.characterCollided;
    }

    canDoBubble() {
        return this.world.keyboard.CTRL && collectedPoison > 0 && !this.bubbleAnimationTimeout;
    }

    canAttack() {
        return this.world.keyboard.SPACEBAR && startAttackTimer > stopAttackTimer && this.attackAnimationCount <= 7;
    }

    isSwimming() {
        return this.world.keyboard.RIGHT && !this.characterCollided ||
            this.world.keyboard.LEFT && !this.characterCollided ||
            this.world.keyboard.UP && !this.characterCollided ||
            this.world.keyboard.DOWN && !this.characterCollided;
    }

    isntMoving() {
        let timePassed = (new Date().getTime() / 1000) - this.lastMovementTime;
        return timePassed > this.timeUntilSleepAnimation;
    }

    bubbleAnimationStarted() { // first img of bubble attack is shown
        return this.bubbleAnimationCount == 0;
    }

    bubbleAnimationRunning() { // third img of bubble attack is shown
        return this.bubbleAnimationCount == 2;
    }

    bubbleAnimationEnded() { // last img of bubble attack is shown
        return this.bubbleAnimationCount == 7;
    }

    slapAnimationStarted() { // first img of slap attack is shown
        return this.attackAnimationCount == 0;
    }

    slapAnimationAttackStarted() { // second img of slap attack is shown
        return this.attackAnimationCount == 1;
    }

    slapAnimationRunning() { // fifth img of slap attack is shown
        return this.attackAnimationCount == 4;
    }

    slapAnimationEnded() { // last img of slap attack is shown
        return this.attackAnimationCount == 7;
    }
    
    deadAnimationStarted() { // first img of dead is shown
        return this.deadAnimationCount == 0;
    }
    
    deadAnimationRunning() { // last img of dead is shown
        return this.deadAnimationCount <= 9;
    }
}