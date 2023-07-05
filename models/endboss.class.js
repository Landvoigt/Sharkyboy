class Endboss extends MovableObject {
    x = 10000;
    y = 0;
    width = 950;
    height = 950;
    offset = {
        x: 60,
        width: 80,
        y: 450,
        height: 175,
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
        setInterval(() => {
            this.spawnAnimation();
            if (this.isDead()) {
                world.gameWon();
            } else if (this.isHurt()) {
                this.hurtAnimation();
            } else if (this.canAttack()) {
                this.attack();
            } else {
                this.Idle();
            }
        }, this.animationTime);
    }

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
        }
    }

    characterInRangeForSpawn() {
        return characterPosition > (this.x - this.spawnOffset) && !endbossReached;
    }

    canAttack() {
        return characterPosition > (this.x - 700) && !this.attackTimeoutActive;
    }

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

    moveLeftDuringAttack() {
        this.x -= 35;
        this.y += 3;
    }

    moveHitbox() {
        this.offset.x = 20;
    }

    attackFinished() {
        this.isAttacking = false;
        this.attackTimeoutActive = true;
        this.lastAttack = new Date().getTime();
    }

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

    resetAttackTimeout() {
        this.attackImageCount = 0;
        this.attackTimeoutActive = false;
    }

    Idle() {
        if (this.spawned) {
            this.offset.x = 60;
            this.wasHitted = false;
            this.playAnimation(KILLERWHALE_IDLE_IMG);
        }
    }

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

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return endbossHealthPoints == 0;
    }

    hurtAnimation() {
        this.playAnimation(KILLERWHALE_HURT_IMG);
    }

    deadAnimation() {
        setInterval(() => {
            if (this.deadAnimationStarted()) {
                this.resetCurrentImage();
                playSound(KILLERWHALE_HURT_SOUND);
            }
            if (this.deadAnimationEnded()) {
                playSound(WINNING_SOUND);
            }
            this.deadAnimationCount++;
            this.playAnimation(KILLERWHALE_DEAD_IMG);
        }, this.deadAnimationTime);
    }

    getCurrentTime() {
        return new Date().getTime();
    }

    spawnAnimationRunning() { // first img of spawn is shown
        return this.spawnAnimationCount <= 9;
    }

    spawnAnimationEnded() { // last img of spawn is shown
        return this.spawnAnimationCount == 9;
    }

    attackAnimationStarted() { // first img of attack is shown
        return this.attackImageCount == 0;
    }

    currentlyAttacking() { // forth img of attack is shown
        return this.attackImageCount == 3;
    }

    attackAnimationEnded() { // last img of attack is shown
        return this.attackImageCount == 5;
    }

    deadAnimationStarted() { // first img of dead is shown
        return this.deadAnimationCount == 0;
    }

    deadAnimationEnded() { // last img of dead is shown
        return this.deadAnimationCount == 4;
    }
}