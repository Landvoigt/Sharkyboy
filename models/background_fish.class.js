class Background_Fish extends MovableObject {
    // x = 100;
    y = 250;
    width = 120;
    height = 120;

    constructor() {
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = Math.random() * 1920;
        this.animate();
    }

    animate() {
       this.moveLeft();
    }

}