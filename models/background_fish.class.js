class BackgroundFish extends MovableObject {
    x = 100;
    y = 150;
    width = 160;
    height = 120;
    randomDirection;
    randomType;
    randomSize;
    imgsToLoad = [];

    constructor() {
        super().loadImage(BG_GREEN_FISH_IMG_SWIM[0]);
        this.load();
        this.randomDirection = Math.round(Math.random() * 1);
        this.setMovementDirection();
        this.randomiseObjects();
        this.randomiseTypeOfObject();
        this.animate();
    }

    load() {
        this.loadImages(BG_GREEN_FISH_IMG_SWIM);
        this.loadImages(BG_RED_FISH_IMG_SWIM);
        this.loadImages(BG_ORANGE_FISH_IMG_SWIM);
    }

    randomiseObjects() {
        this.y = Math.random() * 360;
        this.randomSize = Math.floor(Math.random() * (100 - 30)) + 30;
        this.width = this.randomSize;
        this.height = this.randomSize;
        this.speed = Math.random() * 12;
        this.randomType = Math.floor(Math.random() * 3);
        if (this.otherDirection) {
            this.x = Math.floor(Math.random() * ((characterPosition - 100) - (characterPosition - 600))) + (characterPosition - 600);
        } else {
            this.x = Math.floor(Math.random() * ((characterPosition + 1900) - (characterPosition + 2500))) + (characterPosition + 2500);
        }
    }

    setMovementDirection() {
        if (this.randomDirection == 0) {
            this.otherDirection = false;
        } else {
            this.otherDirection = true;
        }
    }

    randomiseTypeOfObject() {
        if (this.randomType == 0) {
            this.imgsToLoad = BG_GREEN_FISH_IMG_SWIM;
        }
        if (this.randomType == 1) {
            this.imgsToLoad = BG_RED_FISH_IMG_SWIM;
        }
        if (this.randomType == 2) {
            this.imgsToLoad = BG_ORANGE_FISH_IMG_SWIM;
        }
    }

    animate() {
        setInterval(() => {
            if (this.randomDirection == 0) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.imgsToLoad);
        }, 100);
    }
}