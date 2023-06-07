class Enemy_1 extends MovableObject {  // Pufferfish
    id;
    x = 900;
    y = 450;
    width = 200;
    height = 170;
    offset = {
        x: 6,
        y: 10,
        width: 12,
        height: 22,
    };
    randomSpeed = 0.2 + Math.random() * 0.6;
    speedMultiplier = 2;
    transitionAnimationCount = 0;
    deadAnimationCount = 0;
    transitionDone = false;
    enemyDead = false;

    constructor(id) {
        super().loadImage(PUFFER_FISH_RED_SWIM_IMG[0]);
        this.id = id;
        this.load();
        this.x = Math.floor(Math.random() * ((characterPosition + 1700) - (characterPosition + 2000))) + (characterPosition + 2000);
        this.speed = this.randomSpeed;
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
                if (this.deadAnimationCount == 0) {
                    this.currentImage = 0;
                }
                this.playAnimation(PUFFER_FISH_RED_DEAD_IMG);
                if (this.deadAnimationCount == 2) {
                    deleteObject(this.id);
                }
                this.deadAnimationCount++;
            }
            else if (this.characterNearby() && this.transitionInProgress()) {
                if (this.transitionStarts()) {
                    this.currentImage = 0;
                }
                if (this.transitionEnded()) {
                    this.transitionDone = true;
                    this.speed = this.speed * this.speedMultiplier;
                }
                this.playAnimation(PUFFER_FISH_RED_TRANSITION_IMG);
                this.transitionAnimationCount++;
            } else {
                if (this.transitionDone) {
                    this.playAnimation(PUFFER_FISH_RED_ATTACK_IMG);
                }
                else {
                    this.playAnimation(PUFFER_FISH_RED_SWIM_IMG);
                }
            }
            // console.log(this.enemyDead);
        }, 170);
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