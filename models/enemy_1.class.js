class Enemy_1 extends MovableObject {  // Pufferfish
    x = 900;
    y = 650;
    height = 170;
    width = 170;
    SWIMMING_IMG = [
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
        
    ];
    constructor(){
        super().loadImage(this.SWIMMING_IMG[0]);
        this.loadImages(this.SWIMMING_IMG);

        this.x = 750 + Math.random() * 1000;  // Number between 200 and 700
        this.speed = 0.2 + Math.random() * 0.5; 
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.SWIMMING_IMG);
        }, 200)
    }

}