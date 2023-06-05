class StatusBar extends DrawableObject {
    x = 5;
    y = -20;
    width = 400;
    height = 115;
    percentage = 100;
    type;
    images;
    coinSizeAdjustment = {
        width: 0,
        height: 0,
    };
    
    heartSizeAdjustment = {
        width: 0,
        height: 0,
    };

    constructor(statusImages, x, y, type) {
        super();
        this.images = statusImages;
        this.x = x;
        this.y = y;
        this.type = type
        this.loadImages(statusImages);
        this.checkType();
    }

    checkType() {
        if (this.type == 'hp') {
            this.setPercentage(100);
        }
        if (this.type == 'poison') {
            // this.width = 470;
            this.otherDirection = true;
            // this.height = 115;
            this.load();
        }
        if (this.type == 'coin') {
            this.width = 115 + this.coinSizeAdjustment.width;
            this.height = 115 + this.coinSizeAdjustment.height;
            this.loadImage('../100_ copia 6.png');
        }
}

    // setPercentage(50), 50 hp
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.images[this.resolveImageIndex(this.percentage)];
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

    load() {
        // this.percentage = percentage;
        let imagePath = this.images[0];
        this.img = this.imageCache[imagePath];
    }
}