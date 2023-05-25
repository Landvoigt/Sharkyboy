class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 150;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr -['blabla.png','blabla.png2',...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy_1 || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.height, this.width);
            ctx.stroke();
        }
    }
}