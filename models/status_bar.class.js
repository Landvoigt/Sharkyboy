class StatusBar extends DrawableObject {
    width = 400;
    height = 115;
    type;
    images;

    constructor(statusImages, x, y, type) {
        super();
        this.images = statusImages;
        this.x = x;
        this.y = y;
        this.type = type;
        this.loadImages(statusImages);
        this.checkType();
    }

    checkType() {
        if (this.type == 'hp') {
            this.setPercentage(100);
        } else {
            this.otherDirection = true;
            this.setPercentage(collectedPoison * 20);
        }
    }

    setPercentage(percentage) {
        let imagePath = this.images[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[imagePath];
    }

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