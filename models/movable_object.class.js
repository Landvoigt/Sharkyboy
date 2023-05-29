class MovableObject extends DrawableObject {
    offsetY = 0;
    speed = 0.5;
    fallSpeed = 0;
    acceleration = 2;
    hp = 100;
    otherDirection = false;
    lastHit = 0;
    characterCollided = false;
    characterAlive = true;

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

    playAnimation(images) {
        let i = this.currentImage % images.length; // infinity loop for elements in array
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.fallSpeed = 35;
    }

    isColliding(obj) {
        // debugger
        // console.log(this.x + this.width);
        // console.log(obj.x);
        // console.log(this.x);
        // console.log(obj.x + obj.width);
        // console.log(this.y + this.offsetY + this.height);
        // console.log(obj.y);
        // console.log(this.y + this.offsetY);
        // console.log(obj.y + obj.height);
        return (this.x + 101 + this.width - 358 + 151) >= obj.x && this.x + 101 <= (obj.x + obj.width) &&
            (this.y + 234 + this.offsetY + this.height - 202) >= obj.y &&
            (this.y + 234 + this.offsetY) <= (obj.y + obj.height); // &&
        // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }
    // console.log(201 540 298 142);
    // this.x + 101, this.y + 234, this.height - 202, this.width - 358

    hit() {
        this.hp -= 5;
        if (this.hp < 0) {
            if (!this.characterAlive) {
                this.currentImage = 0;
            }
            this.hp = 0;
            this.characterAlive = false;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.characterCollided = true;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.hp == 0;
    }
}