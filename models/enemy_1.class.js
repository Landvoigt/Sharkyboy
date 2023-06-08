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
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.enemyDead && this.deadAnimationCount <= 2) {
                this.playDeadAnimation();
            }
            else if (this.characterNearby() && this.transitionInProgress()) {
                this.playTransitionAnimation();
            }
            else if (!this.enemyDead) {
                if (this.transitionDone) {
                    this.playAnimation(PUFFER_FISH_RED_ATTACK_IMG);
                }
                else {
                    this.playAnimation(PUFFER_FISH_RED_SWIM_IMG);
                }
            }
        }, this.animationTime);
    }

    playDeadAnimation() {
        if (this.deadAnimationCount == 0) {
            this.currentImage = 0;
        }
        this.playAnimation(PUFFER_FISH_RED_DEAD_IMG);
        if (this.deadAnimationCount == 2) {
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

    playTransitionAnimation() {
        if (this.transitionStarts()) {
            this.currentImage = 0;
        }
        if (this.transitionEnded()) {
            this.transitionDone = true;
            this.speed = this.speed * this.speedMultiplier;
        }
        this.playAnimation(PUFFER_FISH_RED_TRANSITION_IMG);
        this.transitionAnimationCount++;
    }

    getRandomSpawnPoint() {
        this.x = Math.floor(Math.random() * ((characterPosition + 1700) - (characterPosition + 2000))) + (characterPosition + 2000);
    }

    getRandomSpeed() {
        this.speed = 0.2 + Math.random() * 0.6;
        this.randomFlyingSpeed_x = 3.5 + Math.random() * 5;
        this.randomFlyingSpeed_y = 3 + Math.random() * 5;
    }

    characterNearby() {
        return characterPosition + 900 > this.x;
    }

    transitionStarts() {
        return this.transitionAnimationCount == 0;
    }

    transitionInProgress() {
        return this.transitionAnimationCount <= 4;
    }

    transitionEnded() {
        return this.characterNearby() && this.transitionAnimationCount == 4;
    }
}