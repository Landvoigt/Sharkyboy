class StatusBar extends DrawableObject {
    IMG = [
        '../img/4.Marcadores/orange/coin_0.png',
        '../img/4.Marcadores/orange/coin_20.png',
        '../img/4.Marcadores/orange/coin_40.png',
        '../img/4.Marcadores/orange/coin_60.png',
        '../img/4.Marcadores/orange/coin_80.png',
        '../img/4.Marcadores/orange/coin_100.png'
    ];
    x = 100;
    y = 100;
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMG);
        this.setPercentage(100);
    }

    // setPercentage(50), 50 hp
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMG[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}