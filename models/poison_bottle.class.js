class PoisonBottle extends MovableObject {
    width = 80;
    height = 110;
    direction;

    constructor(x, y) {
        super();
        this.direction = Math.round(Math.random() * 1);
        this.decideDirection();
        this.x = x;
        this.y = y;
    }

    decideDirection() {
        if (this.direction == 0) {
            this.loadImage('../img/collectibles/poison/1.png');
        } else {
            this.loadImage('../img/collectibles/poison/2.png');
        }
    }
}