class StatusBar extends DrawableObject {
    width = 400;
    height = 115;
    type;
    images;

    /**
    * creates an instance of StatusBar
    */
    constructor(statusImages, x, y, type) {
        super();
        this.images = statusImages;
        this.x = x;
        this.y = y;
        this.type = type;
        this.loadImages(statusImages);
        this.checkType();
    }


    /**
     * checks which type of status bar is generated, sets percentage and direction based on type
     */
    checkType() {
        if (this.type == 'hp') {
            this.setPercentage(100);
        } else {
            this.otherDirection = true;
            this.setPercentage(collectedPoison * 20);
        }
    }


    /**
    * sets the percentage of the status bar and updates the image accordingly
    * @param {number} percentage - the percentage value
    */
    setPercentage(percentage) {
        let imagePath = this.images[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[imagePath];
    }


    /**
    * resolves the index of the status bar image based on the percentage value
    * @param {number} percentage - the percentage value
    * @returns {number} the index of the status bar image
    */
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}