class BackgroundObject extends MovableObject {
    width = 1080;
    height = 1920;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = -140;
    }

}