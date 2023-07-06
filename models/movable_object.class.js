class MovableObject extends DrawableObject {
    speed = 0.5;
    fallSpeed = 0;
    acceleration = 2;
    hp = 100;
    otherDirection = false;
    lastHit = 0;
    characterCollided = false;


    /**
    * checks if the object is above the ground
    */
    isAboveGround() {
        return this.y < this.y_default;
    }


    /**
     * move the object to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
    * move the object to the right
    */
    moveRight() {
        this.x += this.speed;
    }


    /**
    * move the object up
    */
    moveUp() {
        this.y -= this.speed;
    }


    /**
    * move the object down
    */
    moveDown() {
        this.y += this.speed;
    }


    /**
    * plays the animation for the object
    * @param {Array} images - an array of image paths for the animation
    */
    playAnimation(images) {
        let i = this.currentImage % images.length; // infinity loop for elements in array
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    * checks if the object is colliding horizontal or vertical with another object
    * @param {Object} obj - the other object to check collision with
    */
    isColliding(obj) {
        return this.isHorizontalIntersection(obj) && this.isVerticalIntersection(obj);
    }


    /**
     * checks if there´s horizontal collision on either side
     */
    isHorizontalIntersection(obj) {
        return !(this.isLeftSide(obj) || this.isRightSide(obj));
    }


    /**
    * checks if there´s vertical collision on either side
    */
    isVerticalIntersection(obj) {
        return !(this.isAbove(obj) || this.isBelow(obj));
    }


    /**
     * checks if colliding objects bottom hitbox is further than other objects top hitbox
     */
    isAbove(obj) {
        return !(this.getHitBoxBottomPos() > obj.getHitBoxTopPos());
    }


    /**
    * checks if colliding objects top hitbox is further than other objects bottom hitbox
    */
    isBelow(obj) {
        return !(this.getHitBoxTopPos() < obj.getHitBoxBottomPos());
    }


    /**
    * checks if colliding objects right hitbox is further than other objects left hitbox
    */
    isLeftSide(obj) {
        return !(this.getHitBoxRightPos() > obj.getHitBoxLeftPos());
    }


    /**
    * checks if colliding objects left hitbox is further than other objects right hitbox
    */
    isRightSide(obj) {
        return !(this.getHitBoxLeftPos() < obj.getHitBoxRightPos());
    }


    /**
     * returns right position of the objects hitbox
     */
    getHitBoxRightPos() {
        return this.x + this.width - this.offset.width;
    }


    /**
    * returns left position of the objects hitbox
    */
    getHitBoxLeftPos() {
        return this.x + this.offset.x;
    }


    /**
    * returns top position of the objects hitbox
    */
    getHitBoxTopPos() {
        return this.y + this.offset.y;
    }


    /**
    * returns bottom position of the objects hitbox
    */
    getHitBoxBottomPos() {
        return this.y + this.height - this.offset.height;
    }


    /**
    * hits the character with a certain amount of damage, sets health points to 0 if character dead
    * @param {number} dmg - the damage value
    */
    hit(dmg) {
        this.hitCharacter(dmg);
        if (this.characterIsDying()) {
            this.setHealthPointsToZero();
        } else {
            this.lastHit = new Date().getTime();
            this.characterCollision();
        }
    }


    /**
    * sets the properties for the fallback animation after collision
    */
    characterCollision() {
        let startpoint = this.x;
        this.fallSpeed = 0;
        let fallBackInterval = setInterval(() => {
            this.playFallbackAnimation(startpoint, fallBackInterval);
        }, 16);
        playSound(HURT_SOUND);
    }


    /**
    * plays the fallback animation for the character collision
    * @param {number} startpoint - the starting point of the object
    * @param {number} fallBackInterval - the interval for the fallback animation
    */
    playFallbackAnimation(startpoint, fallBackInterval) {
        if (this.fallBackPointNotReached(startpoint)) {
            this.moveCharacterBack();
            this.applyGravity();
            if (this.characterMovesAfterHit()) {
                this.clearFallBackInterval(fallBackInterval);
            }
        } else {
            this.clearFallBackInterval(fallBackInterval);
        }
    }


    /**
    * hits the character with a certain amount of damage
    * @param {number} dmg - the damage value
    */
    hitCharacter(dmg) {
        this.characterCollided = true;
        this.hp -= dmg;
    }


    /**
     * returns true if the characters health points are below 0
     */
    characterIsDying() {
        return this.hp < 0;
    }


    /**
     * sets the characters health points to 0 and resets current img to start dead animation
     */
    setHealthPointsToZero() {
        if (!this.characterAlive) {
            this.resetCurrentImage();
        }
        this.hp = 0;
    }


    /**
     * returns true if characters was hitted in the last 0.6 sec
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 0.6;
    }


    /**
     * returns true if characters health points are 0
     */
    isDead() {
        return this.hp == 0;
    }


    /**
    * ends the character collision
    */
    collisionEnded() {
        this.characterCollided = false;
    }


    /**
    * resets the current image index to start the animation from the first img
    */
    resetCurrentImage() {
        this.currentImage = 0;
    }


    /**
    * checks if the fallback point (260px to the left) has not been reached
    * @param {number} startpoint - the starting point of the object
    * @returns {boolean} true if the fallback point has not been reached, otherwise false
    */
    fallBackPointNotReached(startpoint) {
        return this.x > startpoint - 260 && this.characterCollided;
    }


    /**
    * moves the character back after collision
    */
    moveCharacterBack() {
        this.x -= 12;
        this.y -= 27;
    }


    /**
    * applies gravity to the object to generate fallback animation
    */
    applyGravity() {
        if (this.isAboveGround()) {
            this.y -= this.fallSpeed;
            this.fallSpeed -= this.acceleration;
        }
    }


    /**
    * clears the fallback interval for the character collision
    * @param {number} fallBackInterval - the interval for the fallback animation
    */
    clearFallBackInterval(fallBackInterval) {
        clearInterval(fallBackInterval);
        this.y = this.y_default;
        this.characterCollided = false;
    }


    /**
    * checks if the character is moving after being hit and 0.1 sec timeout
    */
    characterMovesAfterHit() {
        return (new Date().getTime() - this.lastHit > 100) && this.world.keyboard.UP ||
            (new Date().getTime() - this.lastHit > 100) && this.world.keyboard.DOWN;
    }
}