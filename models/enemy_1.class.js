class Enemy_1 extends MovableObject {  // Pufferfish
    x = 900;
    y = 450;
    width = 200;
    height = 170;
    offset = {
        x: 6,
        width: 12,
        y: 10,
        height: 22,
    };
    animationTime = 180;
    speedMultiplier = 2;
    randomFlyingSpeed_x;
    randomFlyingSpeed_y;
    transitionAnimationCount = 0;
    deadAnimationCount = 0;
    transitionDone = false;
    enemyDead = false;

    /**
    * creates an instance of Endboss
    */
    constructor() {
        super().loadImage(PUFFER_FISH_RED_SWIM_IMG[0]);
        this.load();
        this.getRandomSpawnPoint();
        this.getRandomSpeed();
        this.moveLeft();
        this.animate();
    }


    /**
     * preloads all normal enemy imgs
     */
    load() {
        this.loadImages(PUFFER_FISH_RED_SWIM_IMG);
        this.loadImages(PUFFER_FISH_RED_TRANSITION_IMG);
        this.loadImages(PUFFER_FISH_RED_ATTACK_IMG);
        this.loadImages(PUFFER_FISH_RED_DEAD_IMG);
    }


    /**
     * animates the object if game isnt paused
     */
    animate() {
        setInterval(() => {
            if (!pauseGame) {
                this.playAnimations();
            }
        }, this.animationTime);
    }


    /**
    * plays the enemy animations based on the enemy´s state and position
    */
    playAnimations() {
        if (this.isDead()) {
            this.deadAnimation();
        }
        else if (this.characterNearby() && this.transitionAnimationRunning()) {
            this.transitionAnimation();
        }
        else if (!this.enemyDead) {
            if (this.transitionDone) {
                this.playAnimation(PUFFER_FISH_RED_ATTACK_IMG);
            }
            else {
                this.playAnimation(PUFFER_FISH_RED_SWIM_IMG);
            }
        }
    }


    /**
     * moves object to the left
     */
    moveLeft() {
        setInterval(() => {
            if (!pauseGame) {
                super.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * performs enemy dead animation, moves enemy away when animation finished and removes object
     */
    deadAnimation() {
        if (this.deadAnimationStarted()) {
            this.resetCurrentImage();
        }
        this.playAnimation(PUFFER_FISH_RED_DEAD_IMG);
        if (this.deadAnimationEnded()) {
            this.shootEnemyAwayAfterSlap();
            setTimeout(this.deleteEnemy, 500);
        }
        this.deadAnimationCount++;
    }


    /**
     * shoots enemy away after dead
     */
    shootEnemyAwayAfterSlap() {
        setInterval(() => {
            this.y -= this.randomFlyingSpeed_x;
            this.x += this.randomFlyingSpeed_y;
        }, 1);
    }


    /**
     * deletes object
     */
    deleteEnemy() {
        world.deleteObject(enemyToKill[0]);
        enemyToKill = [];
    }


    /**
     * performs transition animation when character nearby, changes speed
     */
    transitionAnimation() {
        if (this.transitionAnimationStarted()) {
            this.resetCurrentImage();
        }
        if (this.transitionAnimationEnded()) {
            this.transitionDone = true;
            this.speed = this.speed * this.speedMultiplier;
        }
        this.playAnimation(PUFFER_FISH_RED_TRANSITION_IMG);
        this.transitionAnimationCount++;
    }

    /**
     * generates random x and y spawn point out of the field of view on the right side 
     */
    getRandomSpawnPoint() {
        this.x = Math.floor(Math.random() * ((characterPosition + 1700) - (characterPosition + 2000))) + (characterPosition + 2000);
        this.y = Math.floor(Math.random() * 640) + 250;
    }


    /**
     * generates random speed parameter and dead animation speed parameter in a given range
     */
    getRandomSpeed() {
        this.speed = casualEnemyMinSpeed + Math.random() * casualEnemyMaxSpeed;
        this.randomFlyingSpeed_x = 3.5 + Math.random() * 5;
        this.randomFlyingSpeed_y = 3 + Math.random() * 5;
    }


    /**
     *  checks if character is within 1000px to enemy
     */
    characterNearby() {
        return characterPosition + 1000 > this.x;
    }


    /**
     * checks if enemy is dead and dead animation is still running
     */
    isDead() {
        return this.enemyDead && this.deadAnimationCount <= 2;
    }


    /**
    * returns true when first img of transition animation is shown
    */
    transitionAnimationStarted() {
        return this.transitionAnimationCount == 0;
    }


    /**
    * returns true when last img of transition animation isnt reached yet
    */
    transitionAnimationRunning() {
        return this.transitionAnimationCount <= 4;
    }


    /**
    * returns true when last img of transition animation is shown
    */
    transitionAnimationEnded() {
        return this.transitionAnimationCount == 4;
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
        return this.deadAnimationCount == 2;
    }
}