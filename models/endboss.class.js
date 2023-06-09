class Endboss extends MovableObject {
    x = 1000;
    y = 0;
    width = 950;
    height = 950;
    offset = {
        x: 60,
        width: 80,
        y: 450,
        height: 175,
    };
    animationTime = 180;
    pointOfSpawnAnimationStarting_unitsBeforeCharacterHasToSpawn = 60 + 1300;
    isAttacking = false;
    attackTimeoutActive = false;
    timeSet = false;
    attackImageCount = 0;
    lastHit = 0;
    currentTime = 0;

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
            else if (this.canAttack()) {
                this.attack();
            }
            else if (endbossReached) {
                this.playAnimation(KILLERWHALE_IDLE_IMG);
            }
            i++;
        }, this.animationTime);
        // console.log(endbossReached);
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
            this.y += 8;
            this.playAnimation(KILLERWHALE_ATTACK_IMG);
            this.isAttacking = true;
        }
        if (this.attackImageCount == 4) {
            this.isAttacking = false;
            this.attackTimeoutActive = true;
            this.lastHit = new Date().getTime();
        }
        this.attackImageCount++;
    }

    checkAttackTimeout() {
        setInterval(() => {
            if (this.attackTimeoutActive && !this.timeSet) {
                this.timeSet = true;
                this.currentTime = new Date().getTime();
            }
            console.log(this.currentTime - this.lastHit);
            if ((this.currentTime - this.lastHit) > 3200) {
                debugger;
                this.resetAttackTimeout;
            }
        }, 100);
    }

    resetAttackTimeout() {
        this.attackImageCount = 0;
        this.attackTimeoutActive = false;
        this.timeSet = false;
    }
}