class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    width = 150;
    height = 150;

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
        });
    }

    draw(ctx) {
        // try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // } catch (e) {
        // console.warn('Error loading image', e);
        // console.log('Could not load image', this.img);
        // }
    }

    drawFrame(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, (this.x + this.width - this.offset.width) - (this.x + this.offset.x), (this.y + this.height - this.offset.height) - (this.y + this.offset.y));
            ctx.stroke();
        }
        if (this instanceof Enemy_1) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, (this.x + this.width - this.offset.width) - (this.x + this.offset.x), (this.y + this.height - this.offset.height) - (this.y + this.offset.y));
            ctx.stroke();
        }
        if (this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof PoisonBottle) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'yellow';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}