class Bubble extends MovableObject {
    width = 100;
    height = 100;
    offset = {
        x: 10,
        width: 10,
        y: 10,
        height: 10,
    };

    /**
    * creates an instance of Bubble
    */
    constructor(x, y) {
        super().loadImage('../img/character/attack/bubble_trap/poison_bubble.png');
        this.x = x;
        this.y = y;
        this.moveRight();
    }


    /**
     * moves bubble to the right with given speed
     */
    moveRight() {
        this.speedY = 30;
        setInterval(() => {
            this.x += 8;
        }, 10);
    }
}