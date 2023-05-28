class Endboss extends MovableObject {
    x = 5500;
    y = 75;
    height = 850;
    width = 850;
    SWIMMING_IMG = [
        '../img/enemies/endboss/swim/(1).png',
        '../img/enemies/endboss/swim/(2).png',
        '../img/enemies/endboss/swim/(3).png',
        '../img/enemies/endboss/swim/(4).png',
        '../img/enemies/endboss/swim/(5).png',
        '../img/enemies/endboss/swim/(6).png',
        '../img/enemies/endboss/swim/(7).png',
        '../img/enemies/endboss/swim/(8).png',
        '../img/enemies/endboss/swim/(9).png',
        '../img/enemies/endboss/swim/(10).png',
        '../img/enemies/endboss/swim/(11).png',
        '../img/enemies/endboss/swim/(12).png',
        '../img/enemies/endboss/swim/(13).png'
    ];


    constructor() {
        super().loadImage(this.SWIMMING_IMG[0]);
        this.loadImages(this.SWIMMING_IMG);

        this.animate();
    }

    animate() {
        // this.moveLeft();

        setInterval(() => {
            // this.playAnimation(this.SWIMMING_IMG);
        }, 200)
    }
}