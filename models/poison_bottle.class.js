class PoisonBottle extends MovableObject {
    width = 90;
    height = 120;
    offset = {
        x: 20,
        width: 20,
        y: 50,
        height: 10,
    };
    animationTime = 130;

    /**
    * creates an instance of PoisonBottle
    */
    constructor(x, y) {
        super();
        this.loadImage(COLLECTIBLE_POISON_IMG[0]);
        this.loadImages(COLLECTIBLE_POISON_IMG);
        this.x = x;
        this.y = y;
        this.animate();
    }


    /**
     * plays the bottle floating animation
     */
    animate() {
        setInterval(() => {
            this.playAnimation(COLLECTIBLE_POISON_IMG);
        }, this.animationTime);
    }
}