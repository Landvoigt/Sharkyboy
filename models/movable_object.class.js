class MovableObject extends DrawableObject {
    offsetY = 0;
    speed = 0.5;
    fallSpeed = 0;
    acceleration = 2;
    hp = 100;
    otherDirection = false;
    lastHit = 0;
    characterCollided = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.fallSpeed > 0) {
                this.y -= this.fallSpeed;
                this.fallSpeed -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 500;
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
        return (this.x + this.width - this.offset.right) >= (obj.x + obj.offset.left) &&
            (this.y + this.height - this.offset.bottom) >= (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom); // &&
        // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }
    // this.x + 101, this.y + 234, this.height - 202, this.width - 358

    hit() {
        this.characterCollided = true;
        this.hp -= 10;
        if (this.hp < 0) {
            if (!this.characterAlive) {
                this.currentImage = 0;
            }
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.characterCollision();
        }
    }

    characterCollision() {
        let startpoint = this.x;
        this.speedY = 35;
        setInterval(() => {
            if (this.x > startpoint - 250 && this.characterCollided) {
                this.x -= 15;
                this.y -= 30;
            } else {
                this.y = 500;
                this.characterCollided = false;
            }
        }, 20);
        HURT_SOUND.play();
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 0.6;
    }

    isDead() {
        return this.hp == 0;
    }
}