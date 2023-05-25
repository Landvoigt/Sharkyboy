class StatusBar extends DrawableObject {
    IMG = [
        '../img/status/health_points/hp_0.png',
        '../img/status/health_points/hp_20.png',
        '../img/status/health_points/hp_40.png',
        '../img/status/health_points/hp_60.png',
        '../img/status/health_points/hp_80.png',
        '../img/status/health_points/hp_100.png'

    ];
    x = 5;
    y = -20;
    width = 90;
    height = 320;
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