class MovableObject extends DrawableObject {
    speed = 0.5;
    fallSpeed = 0;
    acceleration = 2;
    hp = 100;
    otherDirection = false;
    lastHit = 0;
    characterCollided = false;
    inMovement = false;

    // applyGravity() {
    //     if (!this.inMovement) {
    //         setInterval(() => {
    //             if (this.isAboveGround() || this.fallSpeed > 0) {
    //                 this.y -= this.fallSpeed;
    //                 this.fallSpeed -= this.acceleration;
    //             }
    //         }, 1000 / 60);
    //     } else {
    //         return
    //     }
    // }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < this.y_default;
        }
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
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
        return (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (obj.y + obj.offset.top) &&
            (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) &&
            (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom); 
            // &&
        // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    // isNotColliding(obj) {
    //     return  ((this.y + this.height - this.offset.bottom) < (obj.y + obj.offset.top) ||
    //             (this.y + this.offset.top) > (obj.y + obj.height - obj.offset.bottom)) ||
    //             ((this.x + this.width - this.offset.right) < (obj.x + obj.offset.left) ||
    //             (this.x + this.offset.left) > (obj.x + obj.width - obj.offset.right));
    // }

    //  return (
    //     this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
    //     this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
    //     this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
    //     this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    //   );

    hit() {
        this.inMovement = false;
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
        this.fallSpeed = 0;
        let fallBackInterval = setInterval(() => {
            if (this.x > startpoint - 260 && this.characterCollided) {
                this.x -= 12;
                this.y -= 27;
                if (this.isAboveGround()) {
                    this.y -= this.fallSpeed;
                    this.fallSpeed -= this.acceleration;
                }
            } else {
                clearInterval(fallBackInterval);
                this.y = this.y_default;
                this.characterCollided = false;
            }
        }, 16);
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

    collisionEnded() {
        this.characterCollided = false;
    }
}