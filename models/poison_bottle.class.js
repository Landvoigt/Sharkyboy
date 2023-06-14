class PoisonBottle extends MovableObject {
    width = 90;
    height = 120;
    offset = {
        x: 15,
        width: 15,
        y: 45,
        height: 4,
    };
    animationTime = 130;

    constructor(x, y) {
        super();
        this.loadImage(COLLECTIBLE_POISON_IMG[0]);
        this.loadImages(COLLECTIBLE_POISON_IMG);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(COLLECTIBLE_POISON_IMG);
        }, this.animationTime);
    }
}