class Enemy_1 extends MovableObject {  // Pufferfish
    x = 900;
    y = 650;
    height = 170;
    width = 170;
    WALKING_IMG = [
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
        
    ];
    constructor(){
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        this.loadImages(this.WALKING_IMG);

        this.x = 750 + Math.random() * 1000;  // Number between 200 and 700
        this.speed = 0.2 + Math.random() * 0.5; 
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.WALKING_IMG.length;
            let path = this.WALKING_IMG[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200)
    }

}