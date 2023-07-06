class BackgroundFish extends MovableObject {
    width_adjustment = 10;
    min_height = 30;
    max_height = 100;
    max_speed = 12;
    randomDirection;
    randomType;
    randomSize;
    imgsToLoad = [];

    /**
    * creates an instance of BackgroundFish
    */
    constructor() {
        super().loadImage(BG_GREEN_FISH_IMG_SWIM[0]);
        this.load();
        this.setMovementDirection();
        this.randomiseObjects();
        this.animate();
    }


    /**
     * preloads all background fish imgs
     */
    load() {
        this.loadImages(BG_GREEN_FISH_IMG_SWIM);
        this.loadImages(BG_RED_FISH_IMG_SWIM);
        this.loadImages(BG_ORANGE_FISH_IMG_SWIM);
    }


    /**
     * randomises the object in different aspects
     */
    randomiseObjects() {
        this.setSize();
        this.getRandomYSpawnPoint();
        this.getRandomSpeed();
        this.getRandomType();
        this.randomiseTypeOfObject();
    }


    /**
     * gets random movement direction and generates spawn point based on direction
     */
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


    /**
     * randomises kind of fish out of 3
     */
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


    /**
     * moves and animates object if game isnt paused
     */
    animate() {
        setInterval(() => {
            if (!pauseGame) {
                this.move();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!pauseGame) {
                this.playAnimation(this.imgsToLoad);
            }
        }, 100);
    }


    /**
     * moves object left or right
     */
    move() {
        if (this.randomDirection == 0) {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }


    /**
     * generates random object size
     */
    setSize() {
        this.randomSize = this.getRandomSize();
        this.width = this.randomSize + this.width_adjustment;
        this.height = this.randomSize;
    }


    /**
     * returns random y coordinate in a given area
     */
    getRandomYSpawnPoint() {
        this.y = Math.random() * 360;
    }


    /**
     * returns random number between 0 and 2 to generate kind of fish
     */
    getRandomType() {
        this.randomType = Math.floor(Math.random() * 3);
    }


    /**
     * returns random speed parameter 
     */
    getRandomSpeed() {
        this.speed = Math.random() * this.max_speed;
    }


    /**
     * return random number between 0 and 1 to generate movement direction 
     */
    getRandomDirection() {
        return Math.round(Math.random() * 1);
    }


    /**
     * returns random size with given vertices
     */
    getRandomSize() {
        return Math.floor(Math.random() * (this.max_height - this.min_height)) + this.min_height;
    }


    /**
     * returns random x coordinate outside field of view on the left
     */
    getRandomSpawnPointOnLeftSide() {
        return Math.floor(Math.random() * ((characterPosition - 100) - (characterPosition - 600))) + (characterPosition - 600);
    }


    /**
     * returns random x coordinate outside field of view on the right
     */
    getRandomSpawnPointOnRightSide() {
        return Math.floor(Math.random() * ((characterPosition + 1900) - (characterPosition + 2500))) + (characterPosition + 2500);
    }
}