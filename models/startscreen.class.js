class Startscreen {
    img;
    width = 1080;
    height = 1920;
    constructor(imagePath, x) {
        this.loadImage(imagePath);
        this.x = x;
        this.y = -140;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}