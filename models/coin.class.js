class Coin extends MovableObject {
    width = 80;
    height = 80;
    offset = {
        x: 0,
        width: 0,
        y: 0,
        height: 0,
    };
    animationTime = 160;

    /**
    * creates an instance of Coin
    */
    constructor(x, y) {
        super().loadImage(COLLECTIBLE_COIN_IMG[0]);
        this.loadImages(COLLECTIBLE_COIN_IMG);
        this.x = x;
        this.y = y;
        this.animate();
    }


    /**
     * performs coin animation
     */
    animate() {
        setInterval(() => {
            this.playAnimation(COLLECTIBLE_COIN_IMG);
        }, this.animationTime);
    }
}