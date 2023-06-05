class Coin extends MovableObject {
    width = 80;
    height = 80;
    offset = {
        x: 0,
        height: 0,
        y: 0,
        width: 0,
    };
    IMG = [
        '../img/collectibles/coins/1.png',
        '../img/collectibles/coins/2.png',
        '../img/collectibles/coins/3.png',
        '../img/collectibles/coins/4.png',
    ];

    constructor(x, y) {
        super().loadImage('../img/collectibles/coins/1.png');
        this.loadImages(this.IMG);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMG);
        }, 160);
    }
}