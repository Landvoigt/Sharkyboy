class MovableObject extends DrawableObject {
    offsetY = 0;
    speed = 0.5;
    fallSpeed = 0;
    acceleration = 2;
    hp = 100;
    otherDirection = false;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.fallSpeed > 0) {
                this.y -= this.fallSpeed;
                this.fallSpeed -= this.acceleration;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 300;
        }
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    playAnimation(images, count) {
        let i = this.currentImage[count] % images.length; // infinity loop for elements in array
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage[count]++;
    }

    jump() {
        this.fallSpeed = 35;
    }

    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height); // &&
        // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.hp == 0;
    }

     // playAnimationOnce(images, count) {
    //     let path = images[this.currentImage[count]];
    //     this.img = this.imageCache[path];
    //     this.currentImage[count]++;
    // }
}