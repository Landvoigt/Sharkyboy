class Bubble extends MovableObject {
    width = 100;
    height = 100;
    offset = {
        x: 0,
        width: 0,
        y: 0,
        height: 0,
    };

    constructor(x, y) {
        super().loadImage('../img/character/attack/bubble_trap/poison_bubble.png');
        this.x = x;
        this.y = y;
        this.moveRight();
    }

    moveRight() {
        this.speedY = 30;
        setInterval(() => {
            this.x += 8;
        }, 10);
    }
}