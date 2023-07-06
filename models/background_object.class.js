class BackgroundObject extends MovableObject {
    width = 1920;
    height = 1080;

    /**
    * creates an instance of BackgroundObject
    */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}