class Background_Fish extends MovableObject {
    x = 100;
    y = 150;
    width = 120;
    height = 120;
    randomDirection;
    randomType;
    randomSize;
    imgsToLoad = [];

    constructor() {
        super().loadImage(BG_GREEN_FISH_IMG_SWIM[0]);
        this.load();
        this.randomiseObjects();
        this.setMovementDirection();
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
        this.x = Math.random() * 1920;
        this.randomSize = Math.floor(Math.random() * (110 - 30)) + 30;
        this.width = this.randomSize;
        this.height = this.randomSize;
        this.speed = Math.random() * 12;
        this.randomDirection = Math.round(Math.random() * 1);
        this.randomType = Math.floor(Math.random() * 3);
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
        }, 200);
    }
}