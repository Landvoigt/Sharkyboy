class MovableObject {
    x = 120;
    y = 250;
    offsetY = 400;
    img;
    height = 150;
    width = 150;
    speed = 0.5;
    fallSpeed = 0;
    acceleration = 2;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.fallSpeed > 0) {
                this.y -= this.fallSpeed;
                this.fallSpeed -= this.acceleration;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        return this.y < 300;
    }

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
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
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

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    playAnimation(images) {
        // Swim Animation
        let i = this.currentImage % images.length; // infinity loop for elements in array 0,1,2,3,....,0,1,2,3...,0,1,2
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.fallSpeed = 35;
    }

    isColliding(mo) {
        return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) &&
            (this.y + this.offsetY + this.height) >= mo.y &&
            (this.y + this.offsetY) <= (mo.y + mo.height); // &&
            // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

    }
}