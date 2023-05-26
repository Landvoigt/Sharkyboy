class ThrowableObject extends MovableObject {
    x = 100;
    y = 100;
    width = 80;
    height = 80;

    constructor(x, y) {
        super().loadImage('../img/character/attack/bubble_trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 20);
    }
}