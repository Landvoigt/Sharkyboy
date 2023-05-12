class Enemy_1 extends MovableObject {  // Pufferfish
    x = 900;
    y = 800;
    height = 170;
    width = 170;
    constructor(){
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = 750 + Math.random() * 1000;  // Number between 200 and 700
    }

}