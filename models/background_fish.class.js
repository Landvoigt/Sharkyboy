class Background_Fish extends MovableObject {
    // x = 100;
    y = 150;
    width = 120;
    height = 120;
    direction;

    constructor() {
        super().loadImage('../img/background/fishes/puffer_fish_green/swim/swim(4).png');
        this.y = Math.random() * 360;
        this.x = Math.random() * 1920;
        this.speed = Math.random() * 15;
        this.direction = Math.round(Math.random() * 1);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.direction == 0) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }, 1000 / 60);
    }

}