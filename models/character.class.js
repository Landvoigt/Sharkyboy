class Character extends MovableObject {
    x = 100;
    y = 300;
    height = 500;
    width = 500;
    speed = 10;
    world;
    IDLE_IMG = [
        '../img/1.Sharkie/1.IDLE/1.png',
        '../img/1.Sharkie/1.IDLE/2.png',
        '../img/1.Sharkie/1.IDLE/3.png',
        '../img/1.Sharkie/1.IDLE/4.png',
        '../img/1.Sharkie/1.IDLE/5.png',
        '../img/1.Sharkie/1.IDLE/6.png',
        '../img/1.Sharkie/1.IDLE/7.png',
        '../img/1.Sharkie/1.IDLE/8.png',
        '../img/1.Sharkie/1.IDLE/9.png',
        '../img/1.Sharkie/1.IDLE/10.png',
        '../img/1.Sharkie/1.IDLE/11.png',
        '../img/1.Sharkie/1.IDLE/12.png',
        '../img/1.Sharkie/1.IDLE/13.png',
        '../img/1.Sharkie/1.IDLE/14.png',
        '../img/1.Sharkie/1.IDLE/15.png',
        '../img/1.Sharkie/1.IDLE/16.png',
        '../img/1.Sharkie/1.IDLE/17.png',
        '../img/1.Sharkie/1.IDLE/18.png'
    ];
    WALKING_IMG = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png'
    ];
    WALKING_SOUND = new Audio('linklinklink');

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.WALKING_IMG);

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.WALKING_SOUND.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.WALKING_SOUND.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.WALKING_SOUND.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Swim Animation
                let i = this.currentImage % this.WALKING_IMG.length; // infinity loop for elements in array 0,1,2,3,....,0,1,2,3...,0,1,2
                let path = this.WALKING_IMG[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 90);
    }

    jump() {

    }
}