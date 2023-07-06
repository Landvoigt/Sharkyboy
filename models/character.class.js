class Character extends MovableObject {
    x = 60;
    y = 500;
    width = 500;
    height = 500;
    offset = {
        x: 105,
        width: 105,
        y: 252,
        height: 128,
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

    /**
    * creates an instance of Character
    */
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


    /**
    * moves the character in all directions
    */
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


    /**
    * moves the character to the right
    */
    moveRight() {
        super.moveRight();
        this.setMovementAttributes();
        this.otherDirection = false;
    }


    /**
    * moves the character to the left, mirrors image
    */
    moveLeft() {
        super.moveLeft();
        this.setMovementAttributes();
        this.otherDirection = true;
    }


    /**
    * moves the character up
    */
    moveUp() {
        super.moveUp();
        this.setMovementAttributes();
        this.y_default = this.y;
    }


    /**
    * moves the character down
    */
    moveDown() {
        super.moveDown();
        this.setMovementAttributes();
        this.y_default = this.y;
    }


    /**
     * plays sound, resets idle boolean and last movement time
     */
    setMovementAttributes() {
        playSound(SWIMMING_SOUND);
        this.isIdling = false;
        this.lastMovementTime = new Date().getTime() / 1000;
    }


    /**
    * repositions the camera based on the character's position
    */
    repositionCamera() {
        this.world.camera_x = -this.x + 180;
    }


    /**
     * sets a timestamp if character begins to idle
     */
    checkIdleTime() {
        if (this.isIdling) {
            this.lastMovementTime = new Date().getTime() / 1000;
        }
    }


    /**
    * if the character is alive it generates an interval for character animations with changeable animation times
    */
    startAnimationTimer() {
        if (characterAlive) {
            this.animationTimeout = setTimeout(() => {
                this.playCharacterAnimations();
                this.startAnimationTimer(); // renew timer
            }, this.animationTime);
        }
    }


    /**
    * plays the character animations based on the character's state
    */
    playCharacterAnimations() {
        if (this.isDead()) {
            this.world.gameOver();
        } else if (this.isHurt()) {
            this.changeAnimationTime(130);
            this.hurtAnimation();
        } else if (this.canDoBubble()) {
            this.changeAnimationTime(130);
            this.bubbleAnimation();
        } else if (this.canAttack()) {
            this.changeAnimationTime(65);
            this.slapAnimation();
        } else if (this.isSwimming()) {
            this.changeAnimationTime(90);
            this.swimAnimation();
        } else {
            this.changeAnimationTime(130);
            this.idleAnimation();
        }
    }


    /**
    * changes time until next animation img is shown
    * @param {number} ms - animation time in milliseconds
    */
    changeAnimationTime(ms) {
        this.animationTime = ms;
    }


    /**
    * sets damage timeout, performs the hurt animation
    */
    hurtAnimation() {
        this.characterDamageTimeout = true;
        this.playAnimation(CHARACTER_HURT_FROM_POISON_IMG);
    }


    /**
    * cancels damage timeout, performs the swim animation
    */
    swimAnimation() {
        this.characterDamageTimeout = false;
        this.playAnimation(CHARACTER_SWIMMING_IMG);
    }


    /**
    * performs the bubble attack animation, sets percentage of poison status bar when performed, creates bubble and removes poison from collected
    */
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
            this.bubbleAnimationTimeout = true;
        }
        this.bubbleAnimationCount++;
        this.playAnimation(CHARACTER_BUBBLE_ATTACK_IMG);
        this.lastMovementTime = new Date().getTime() / 1000;
    }


    /**
    * performs the slap attack animation
    */
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


    /**
    * performs the character dead animation
    */
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


    /**
    * cancels damage timeout, performs different idle animations based on idle time
    */
    idleAnimation() {
        this.characterDamageTimeout = false;
        if (this.isntMoving() && this.isIdling) {
            this.playAnimation(CHARACTER_LONG_IDLE_IMG);
        } else {
            this.isIdling = true;
            this.bubbleAnimationCount = 0;
            this.playAnimation(CHARACTER_IDLE_IMG);
        }
    }


    /**
    * gets the current x position of the character.
    */
    getCharacterPosition() {
        characterPosition = this.x;
    }


    /**
    * checks if the character enters the endzone
    */
    enterEndzone() {
        return characterPosition > this.world.level.levelEndzoneStart_x;
    }


    /**
    * checks if the character leaves the endzone
    */
    leaveEndzone() {
        return characterPosition < this.world.level.levelEndzoneStart_x && endbossReached;
    }


    /**
     * checks if character isnt at level end, isnt collided and the right key is pushed
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x && !this.characterCollided;
    }


    /**
    * checks if character isnt at level end, isnt collided and the right key is pushed
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.level.levelStart_x && !this.characterCollided;
    }


    /**
    * checks if character is in movable vertical area, isnt collided and the right key is pushed
    */
    canMoveUp() {
        return this.world.keyboard.UP && this.y > this.y_min && !this.characterCollided;
    }


    /**
    * checks if character is in movable vertical area, isnt collided and the right key is pushed
    */
    canMoveDown() {
        return this.world.keyboard.DOWN && this.y < this.y_max && !this.characterCollided;
    }


    /**
     * checks if there´s enough collected poison, there´s no timeout and the right key is pushed
     */
    canDoBubble() {
        return this.world.keyboard.CTRL && collectedPoison > 0 && !this.bubbleAnimationTimeout;
    }


    /**
    * checks if there´s no timeout, attack animation is running and the right key is pushed
    */
    canAttack() {
        return this.world.keyboard.SPACEBAR && startAttackTimer > stopAttackTimer && this.attackAnimationCount <= 7;
    }


    /**
    * checks if there´s no collision and the right key is pushed
    */
    isSwimming() {
        return this.world.keyboard.RIGHT && !this.characterCollided ||
            this.world.keyboard.LEFT && !this.characterCollided ||
            this.world.keyboard.UP && !this.characterCollided ||
            this.world.keyboard.DOWN && !this.characterCollided;
    }


    /**
     * checks the time since last character movement
     */
    isntMoving() {
        let timePassed = (new Date().getTime() / 1000) - this.lastMovementTime;
        return timePassed > this.timeUntilSleepAnimation;
    }


    /**
    * returns true when first img of bubble attack animation is shown
    */
    bubbleAnimationStarted() {
        return this.bubbleAnimationCount == 0;
    }


    /**
    * returns true when third img of bubble attack animation is shown
    */
    bubbleAnimationRunning() {
        return this.bubbleAnimationCount == 2;
    }


    /**
    * returns true when last img of bubble attack animation is shown
    */
    bubbleAnimationEnded() {
        return this.bubbleAnimationCount == 7;
    }


    /**
    * returns true when first img of slap attack animation is shown
    */
    slapAnimationStarted() {
        return this.attackAnimationCount == 0;
    }


    /**
    * returns true when second img of slap attack animation is shown
    */
    slapAnimationAttackStarted() {
        return this.attackAnimationCount == 1;
    }


    /**
    * returns true when fifth img of slap attack animation is shown
    */
    slapAnimationRunning() {
        return this.attackAnimationCount == 4;
    }


    /**
    * returns true when last img of slap attack animation is shown
    */
    slapAnimationEnded() {
        return this.attackAnimationCount == 7;
    }


    /**
    * returns true when first img of character dead animation is shown
    */
    deadAnimationStarted() {
        return this.deadAnimationCount == 0;
    }


    /**
    * returns true when last img of character dead animation is shown
    */
    deadAnimationRunning() {
        return this.deadAnimationCount <= 9;
    }
}