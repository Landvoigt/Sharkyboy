class Enemy_1 extends MovableObject {  // Pufferfish
    x = 900;
    y = 450;
    width = 200;
    height = 170;
    offset = {
        x: 6,
        y: 10,
        width: 12,
        height: 42,
    };
    SWIMMING_IMG = [
        '../img/enemies/puffer_fish_red/swim/(1).png',
        '../img/enemies/puffer_fish_red/swim/(2).png',
        '../img/enemies/puffer_fish_red/swim/(3).png',
        '../img/enemies/puffer_fish_red/swim/(4).png',
        '../img/enemies/puffer_fish_red/swim/(5).png'

    ];
    constructor() {
        super().loadImage(this.SWIMMING_IMG[0]);
        this.loadImages(this.SWIMMING_IMG);

        this.x = 750 + Math.random() * 1000;  // Number between 200 and 700
        this.speed = 0.2 + Math.random() * 0.5;
        // this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.SWIMMING_IMG);
        }, 200);
    }

}