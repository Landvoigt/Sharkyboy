class StatusBar extends DrawableObject {
    x = 5;
    y = -20;
    width = 320;
    height = 90;
    percentage = 100;
    hpImages;
    poisonImages;
    coinsImages;

    constructor(statusImages, y, type) {
        super();
        this.y = y;
        this.loadImages(statusImages);
        if (type == 'hp') {
            this.hpImages = statusImages;
            this.setPercentage(100);
        } if (type == 'poison') {
            this.poisonImages = statusImages;
            this.load(this.poisonImages);
        } else {
            this.coinsImages = statusImages;
            this.load(this.coinsImages);
        }
    }

    // setPercentage(50), 50 hp
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.hpImages[this.resolveImageIndex(this.percentage)];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    load(images) {
        // this.percentage = percentage;
        let imagePath = images[5];
        this.img = this.imageCache[imagePath];
    }
}