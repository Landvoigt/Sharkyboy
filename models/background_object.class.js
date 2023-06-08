class BackgroundObject extends MovableObject {
    width = 1920;
    height = 1080;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}