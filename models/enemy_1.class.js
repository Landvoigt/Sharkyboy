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

    constructor() {
        super().loadImage(PUFFER_FISH_RED_SWIM_IMG[0]);
        this.load();
        this.getRandomSpawnPoint();
        this.getRandomSpeed();
        this.moveLeft();
        this.animate();
    }

    load() {
        this.loadImages(PUFFER_FISH_RED_SWIM_IMG);
        this.loadImages(PUFFER_FISH_RED_TRANSITION_IMG);
        this.loadImages(PUFFER_FISH_RED_ATTACK_IMG);
        this.loadImages(PUFFER_FISH_RED_DEAD_IMG);
    }

    animate() {
        setInterval(() => {
            if (!pauseGame) {
                if (this.enemyDead && this.deadAnimationCount <= 2) {
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
        }, this.animationTime);
    }

    moveLeft() {
        setInterval(() => {
            if (!pauseGame) {
                super.moveLeft();
            }
        }, 1000 / 60);
    }

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

    shootEnemyAwayAfterSlap() {
        setInterval(() => {
            this.y -= this.randomFlyingSpeed_x;
            this.x += this.randomFlyingSpeed_y;
        }, 1);
    }

    deleteEnemy() {
        world.deleteObject(enemyToKill[0]);
        enemyToKill = [];
    }

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

    getRandomSpeed() {
        this.speed = casualEnemyMinSpeed + Math.random() * casualEnemyMaxSpeed;
        this.randomFlyingSpeed_x = 3.5 + Math.random() * 5;
        this.randomFlyingSpeed_y = 3 + Math.random() * 5;
    }

    characterNearby() { // character is within 1000px near enemy
        return characterPosition + 1000 > this.x;
    }

    transitionAnimationStarted() { // first img of transition is shown
        return this.transitionAnimationCount == 0;
    }

    transitionAnimationRunning() { // last img of transition is not reached yet
        return this.transitionAnimationCount <= 4;
    }

    transitionAnimationEnded() { // last img of transition is shown
        return this.transitionAnimationCount == 4;
    }

    deadAnimationStarted() { // first img of dead is shown
        return this.deadAnimationCount == 0;
    }

    deadAnimationEnded() { // last img of dead is shown
        return this.deadAnimationCount == 2;
    }
}