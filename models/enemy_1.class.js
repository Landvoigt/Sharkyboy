class Enemy_1 extends MovableObject {  // Pufferfish
    x = 900;
    y = 450;
    width = 200;
    height = 170;
    offset = {
        x: 6,
        y: 10,
        width: 12,
        height: 42,
    };
    transitionAnimationCount = 0;
    transitionDone = false;

    constructor() {
        super().loadImage(PUFFER_FISH_RED_SWIM_IMG[0]);
        this.load();
        this.x = 1500 + Math.random() * 1000;  // Number between 200 and 700
        this.speed = 0.2 + Math.random() * 0.6;
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
            if (this.characterNearby() && this.transitionInProgress()) {
                if (this.transitionStarts()) {
                    this.currentImage = 0;
                }
                if (this.transitionEnded()) {
                    this.transitionDone = true;
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
        }, 160);
    }

    characterNearby() {
        return characterPosition + 1000 > this.x;
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