class Endboss extends MovableObject {
    x = 1500;
    y = 0;
    width = 950;
    height = 950;
    offset = {
        x: 60,
        width: 80,
        y: 450,
        height: 175,
    };
    hp = 200;
    animationTime = 180;
    pointOfSpawnAnimationStarting_unitsBeforeCharacterHasToSpawn = 60 + 1300;
    isAttacking = false;
    attackTimeoutActive = false;
    endbossAlive = true;
    attackImageCount = 0;
    deadAnimationCount = 0;
    lastAttack;
    lastHit = 0;

    constructor() {
        super().loadImage(KILLERWHALE_SPAWN_IMG[0]);
        this.load();
        this.animate();
        this.checkAttackTimeout();
    }

    load() {
        this.loadImages(KILLERWHALE_SPAWN_IMG);
        this.loadImages(KILLERWHALE_IDLE_IMG);
        this.loadImages(KILLERWHALE_ATTACK_IMG);
        this.loadImages(KILLERWHALE_HURT_IMG);
        this.loadImages(KILLERWHALE_DEAD_IMG);
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (this.characterInRangeForSpawn()) {
                endbossReached = true;
                i = 0;
            }
            if (i < 10 && endbossReached) {
                this.playAnimation(KILLERWHALE_SPAWN_IMG);
            }
            if (this.isDead()) {
                if (this.deadAnimationCount == 0) {
                    this.currentImage = 0;
                }
                if (this.deadAnimationCount <= 4) {
                    this.playAnimation(KILLERWHALE_DEAD_IMG);
                    this.endbossAlive = false;
                }
                this.deadAnimationCount++
            } else if (this.isHurt()) {
                this.playAnimation(KILLERWHALE_HURT_IMG);
            } else if (this.canAttack()) {
                this.attack();
            } else {
                if (endbossReached) {
                    this.playAnimation(KILLERWHALE_IDLE_IMG);
                }
            }
            i++;
        }, this.animationTime);
    }

    characterInRangeForSpawn() {
        return characterPosition > 3700 && !endbossReached;
    }

    canAttack() {
        return characterPosition > (this.x - 700) && !this.attackTimeoutActive;
    }

    attack() {
        if (this.attackImageCount <= 4) {
            this.x -= 35;
            this.y += 3;
            this.playAnimation(KILLERWHALE_ATTACK_IMG);
            this.isAttacking = true;
        }
        if (this.attackImageCount == 4) {
            this.isAttacking = false;
            this.attackTimeoutActive = true;
            this.lastAttack = new Date().getTime();
        }
        this.attackImageCount++;
    }

    checkAttackTimeout() {
        setInterval(() => {
            if (this.attackTimeoutActive) {
                let time = this.getCurrentTime();
                if (time - this.lastAttack > 3200) {
                    this.resetAttackTimeout();
                }
            }
        }, 100);
    }

    resetAttackTimeout() {
        this.attackImageCount = 0;
        this.attackTimeoutActive = false;
    }

    hit() {
        this.hp -= 50;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
            console.log(this.hp);
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.hp == 0;
    }

    getCurrentTime() {
        return new Date().getTime();
    }
}