class Startscreen {
    y = -140;
    img;
    width = 1080;
    height = 1920;
    constructor(imagePath, x, y, width, height) {
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}