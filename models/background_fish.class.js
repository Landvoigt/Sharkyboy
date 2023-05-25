class Background_Fish extends MovableObject {
    // x = 100;
    y = 150;
    width = 120;
    height = 120;

    constructor() {
        super().loadImage('../img/background/fishes/puffer_fish_green/swim/swim(4).png');

        this.x = Math.random() * 1920;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}