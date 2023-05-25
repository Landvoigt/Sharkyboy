class StatusBar extends DrawableObject {
    x = 5;
    y = -20;
    width = 90;
    height = 320;
    percentage = 100;
    hpImages;
    poisonImages;
    coinsImages;
    currentStatusIsHealth;

    constructor(statusImages, y, type) {
        super();
        this.y = y;
        this.loadImages(statusImages);
        if (type == 'hp') {
            this.hpImages = statusImages;
            this.setPercentage(100);
            this.currentStatusIsHealth = true;
        } if (type == 'poison') {
            this.poisonImages = statusImages;
            this.load(100, this.poisonImages);
            this.currentStatusIsHealth = false;
        } else {
            this.coinsImages = statusImages;
            this.load(100, this.coinsImages);
            this.currentStatusIsHealth = false;
        }
    }

    // setPercentage(50), 50 hp
    setPercentage(percentage) {
        if (this.currentStatusIsHealth == true) {
            this.percentage = percentage;
            let imagePath = this.hpImages[this.resolveImageIndex(this.percentage)];
            this.img = this.imageCache[imagePath];
        }
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

    load(percentage, images) {
        this.percentage = percentage;
        let imagePath = images[5];
        this.img = this.imageCache[imagePath];
    }
}