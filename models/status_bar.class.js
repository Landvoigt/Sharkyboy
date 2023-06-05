class StatusBar extends DrawableObject {
    x = 5;
    y = -20;
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
        }
        if (this.type == 'poison') {
            this.otherDirection = true;
            this.setPercentage(collectedPoison * 20);
        }
        if (this.type == 'coin') {
            this.width = 115;
            this.height = 115;
            this.loadImage('../img/status/coins/coin.png');
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