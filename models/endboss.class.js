class Endboss extends MovableObject {
    x = 5500;
    y = 75;
    height = 850;
    width = 850;
    SWIMMING_IMG = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];


    constructor() {
        super().loadImage(this.SWIMMING_IMG[0]);
        this.loadImages(this.SWIMMING_IMG);

        this.animate();
    }

    animate() {
        // this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.SWIMMING_IMG);
        }, 200)
    }
}