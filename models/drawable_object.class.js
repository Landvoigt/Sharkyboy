class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    width = 150;
    height = 150;


    /**
     * loads an image
     * @param {*url} path - image url
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    
    /**
     * loads all images from the array
     * @param {Array} arr -['img_1.png','img_2.png',...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * draws an object on the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}