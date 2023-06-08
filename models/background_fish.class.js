class BackgroundFish extends MovableObject {
    width_adjustment = 10;
    min_height = 30;
    max_height = 100;
    max_speed = 12;
    randomDirection;
    randomType;
    randomSize;
    imgsToLoad = [];

    constructor() {
        super().loadImage(BG_GREEN_FISH_IMG_SWIM[0]);
        this.load();
        this.setMovementDirection();
        this.randomiseObjects();
        this.animate();
    }

    load() {
        this.loadImages(BG_GREEN_FISH_IMG_SWIM);
        this.loadImages(BG_RED_FISH_IMG_SWIM);
        this.loadImages(BG_ORANGE_FISH_IMG_SWIM);
    }

    randomiseObjects() {
        this.setSize();
        this.getRandomYSpawnPoint();
        this.getRandomSpeed();
        this.getRandomType();
        this.randomiseTypeOfObject();
    }

    setMovementDirection() {
        this.randomDirection = this.getRandomDirection();
        if (this.randomDirection == 0) {
            this.otherDirection = false;
            this.x = this.getRandomSpawnPointOnRightSide();
        } else {
            this.otherDirection = true;
            this.x = this.getRandomSpawnPointOnLeftSide();
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

    setSize() {
        this.randomSize = this.getRandomSize();
        this.width = this.randomSize + this.width_adjustment;
        this.height = this.randomSize;
    }

    getRandomYSpawnPoint() {
        this.y = Math.random() * 360;
    }

    getRandomType() {
        this.randomType = Math.floor(Math.random() * 3);
    }

    getRandomSpeed() {
        this.speed = Math.random() * this.max_speed;
    }

    getRandomDirection() {
        return Math.round(Math.random() * 1);
    }

    getRandomSize() {
        return Math.floor(Math.random() * (this.max_height - this.min_height)) + this.min_height;
    }

    getRandomSpawnPointOnLeftSide() {
        return Math.floor(Math.random() * ((characterPosition - 100) - (characterPosition - 600))) + (characterPosition - 600);
    }

    getRandomSpawnPointOnRightSide() {
        return Math.floor(Math.random() * ((characterPosition + 1900) - (characterPosition + 2500))) + (characterPosition + 2500);
    }
}