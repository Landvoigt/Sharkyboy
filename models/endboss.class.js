class Endboss extends MovableObject {
    x = 10000;
    y = 0;
    width = 950;
    height = 950;
    offset = {
        x: 70,
        width: 80,
        y: 450,
        height: 185,
    };
    spawnOffset = 1300;
    attackResetTime = 3400;
    animationTime = 180;
    deadAnimationTime = 120;
    spawnAnimationCount;
    attackImageCount = 0;
    lastHit = 0;
    deadAnimationCount = 0;
    lastAttack;
    spawned = false;
    isAttacking = false;
    attackTimeoutActive = false;
    wasHitted = false;
    endbossAlive = true;

    /**
    * creates an instance of Endboss
    */
    constructor() {
        super().loadImage(KILLERWHALE_SPAWN_IMG[0]);
        this.load();
        this.animate();
        this.checkAttackTimeout();
    }


    /**
     * preloads all endboss imgs
     */
    load() {
        this.loadImages(KILLERWHALE_SPAWN_IMG);
        this.loadImages(KILLERWHALE_IDLE_IMG);
        this.loadImages(KILLERWHALE_ATTACK_IMG);
        this.loadImages(KILLERWHALE_HURT_IMG);
        this.loadImages(KILLERWHALE_DEAD_IMG);
    }


    /**
    * animates the end boss object
    */
    animate() {
        setInterval(() => {
            endbossPosX = this.x;
            endbossPosY = this.y;

            this.spawnAnimation();
            if (this.isDead()) {
                gameFinished();
            } else if (this.isHurt()) {
                this.hurtAnimation();
            } else if (this.canAttack()) {
                this.attack();
            } else {
                this.idle();
            }
        }, this.animationTime);
    }


    /**
    * performs the spawn animation
    */
    spawnAnimation() {
        if (this.characterInRangeForSpawn()) {
            this.spawnAnimationCount = 0;
            endbossReached = true;
        }
        if (this.spawnAnimationRunning()) {
            this.playAnimation(KILLERWHALE_SPAWN_IMG);
            this.spawnAnimationCount++;
        }
        if (this.spawnAnimationEnded()) {
            this.spawned = true;
            endbossSpawned = true;
        }
    }


    /**
    * checks if the character is in range for spawn
    * @returns {boolean} True if the character is in range for spawn, otherwise false
    */
    characterInRangeForSpawn() {
        return characterPosition > (this.x - this.spawnOffset) && !endbossReached;
    }


    /**
    * checks if the end boss can attack
    * @returns {boolean} True if character within 700px to end boss and no attack timeout active, otherwise false
    */
    canAttack() {
        return characterPosition > (this.x - 700) && !this.attackTimeoutActive;
    }


    /**
    * performs the attack animation, moves the object towards the character
    */
    attack() {
        if (this.attackAnimationStarted()) {
            this.resetCurrentImage();
            this.isAttacking = true;
        }
        if (this.currentlyAttacking()) {
            this.moveHitbox();
        }
        if (this.attackAnimationEnded()) {
            this.attackFinished();
        }
        this.attackImageCount++;
        this.playAnimation(KILLERWHALE_ATTACK_IMG);
        this.moveLeftDuringAttack();
    }


    /**
    * moves the end boss to the left during the attack
    */
    moveLeftDuringAttack() {
        this.x -= 35;
        this.y += 3;
    }


    /**
    * moves the hitbox of the end boss
    */
    moveHitbox() {
        this.offset.x = 20;
    }


    /**
    * handles the attack finishing
    */
    attackFinished() {
        this.isAttacking = false;
        this.attackTimeoutActive = true;
        this.lastAttack = new Date().getTime();
    }


    /**
    * checks the attack timeout, resets after reached time
    */
    checkAttackTimeout() {
        setInterval(() => {
            if (this.attackTimeoutActive) {
                let time = this.getCurrentTime();
                if (time - this.lastAttack > this.attackResetTime) {
                    this.resetAttackTimeout();
                }
            }
        }, 100);
    }


    /**
    * resets the attack timeout
    */
    resetAttackTimeout() {
        this.attackImageCount = 0;
        this.attackTimeoutActive = false;
    }


    /**
    * cancels character damage timeout, performs the idle animation, resets the hitbox
    */
    idle() {
        this.characterDamageTimeout = false;
        if (this.spawned) {
            this.offset.x = 60;
            this.wasHitted = false;
            this.playAnimation(KILLERWHALE_IDLE_IMG);
        }
    }


    /**
    * gives damage to end boss, sets to dead if 0 healthpoints, saves last hit time
    */
    hit() {
        playSound(KILLERWHALE_HURT_SOUND);
        endbossHealthPoints -= 50;
        if (endbossHealthPoints < 0) {
            this.endbossAlive = false;
            endbossHealthPoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
    * checks if the end boss is hurt, stays true until 1 sec is reached
    */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
    * true when end boss health points are 0
    */
    isDead() {
        return endbossHealthPoints == 0;
    }


    /**
    * sets a timeout for the character getting damaged, performs the hurt animation
    */
    hurtAnimation() {
        this.characterDamageTimeout = true;
        this.playAnimation(KILLERWHALE_HURT_IMG);
    }


    /**
    * performs the dead animation
    */
    deadAnimation() {
        let deadAnimationInterval = setInterval(() => {
            if (this.deadAnimationStarted()) {
                this.resetCurrentImage();
                playSound(KILLERWHALE_HURT_SOUND);
            }
            if (this.deadAnimationEnded()) {
                playSound(WINNING_SOUND);
                setTimeout(() => {
                    clearInterval(deadAnimationInterval);
                }, 600);
            }
            this.deadAnimationCount++;
            this.playAnimation(KILLERWHALE_DEAD_IMG);
        }, this.deadAnimationTime);
    }


    /**
    * gets the current time
    * @returns {number} The current time in milliseconds.
    */
    getCurrentTime() {
        return new Date().getTime();
    }


    /**
    * returns true when last img of spawn animation isnt reached yet
    */
    spawnAnimationRunning() {
        return this.spawnAnimationCount <= 9;
    }


    /**
    * returns true when last img of spawn animation is shown
    */
    spawnAnimationEnded() {
        return this.spawnAnimationCount == 9;
    }


    /**
    * returns true when first img of attack animation is shown
    */
    attackAnimationStarted() {
        return this.attackImageCount == 0;
    }


    /**
    * returns true when forth img of attack animation is shown
    */
    currentlyAttacking() {
        return this.attackImageCount == 3;
    }


    /**
    * returns true when last img of attack animation is shown
    */
    attackAnimationEnded() {
        return this.attackImageCount == 5;
    }


    /**
    * returns true when first img of dead animation is shown
    */
    deadAnimationStarted() {
        return this.deadAnimationCount == 0;
    }


    /**
    * returns true when last img of dead animation is shown
    */
    deadAnimationEnded() {
        return this.deadAnimationCount == 4;
    }
}