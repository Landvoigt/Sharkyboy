class Enemy_1 extends MovableObject {  // Pufferfish
    x = 900;
    y = 750;
    height = 170;
    width = 170;
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
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.SWIMMING_IMG, 3);
        }, 200)
    }

}