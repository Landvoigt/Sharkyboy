class PoisonBottle extends MovableObject {
    width = 90;
    height = 120;
    offset = {
        x: 0,
        height: 0,
        y: 0,
        width: 0,
    };
    IMG = [
        '../img/collectibles/poison/1.png',
        '../img/collectibles/poison/2.png',
        '../img/collectibles/poison/3.png',
        '../img/collectibles/poison/4.png',
        '../img/collectibles/poison/5.png',
        '../img/collectibles/poison/6.png',
        '../img/collectibles/poison/7.png',
        '../img/collectibles/poison/8.png',
    ]

    constructor(x, y) {
        super();
        this.loadImage('../img/collectibles/poison/1.png');
        // this.decideDirection();
        this.loadImages(this.IMG);
        this.x = x;
        this.y = y;
        this.animate();
    }

    // decideDirection() {
    //     if (this.direction == 0) {
    // this.loadImage('../img/collectibles/poison/1.png');
    //     } else {
    //         this.loadImage('../img/collectibles/poison/2.png');
    //     }
    // }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMG);
        }, 130);
    }
}