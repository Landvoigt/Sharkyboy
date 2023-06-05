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
            this.setHpPercentage(100);
        }
        if (this.type == 'poison') {
            this.otherDirection = true;
            this.setPoisonPercentage(collectedPoison * 20);
        }
        if (this.type == 'coin') {
            this.width = 115 + this.coinSizeAdjustment.width;
            this.height = 115 + this.coinSizeAdjustment.height;
            this.loadImage('../100_ copia 6.png');
        }
    }

    setHpPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.images[this.resolveImageIndexHp(this.percentage)];
        this.img = this.imageCache[imagePath];
    }

    setPoisonPercentage(percentage) {
        let imagePath = this.images[this.resolveImageIndexPoison(percentage)];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndexHp(percentage) {
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
    
    resolveImageIndexPoison(percentage) {
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