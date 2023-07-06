/**
 * represents the game world
 */
class World {
    character = new Character();
    level = level_1;
    statusBarHP = new StatusBar(HP_BAR_IMG, 25, -5, 'hp');
    statusBarPoison = new StatusBar(POISON_BAR_IMG, 1510, -5, 'poison');
    statusBarPoisonAnimation = new PoisonBottle(1825, -12);
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    movableBubbles = [];
    movementCache = [];
    currentSpeedParam;
    coinsCount = 0;
    enemySpawnCounter = 1;
    enemyRespawnDistance = 500;
    lastEnemyRespawnBeforeEndboss = 7500;
    bgFishRespawnInterval = 2000;

    /**
    * creates an instance of the World class
    * @param {Object} canvas - the canvas element
    * @param {Object} keyboard - the keyboard input object
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.run();
        this.draw();
        this.setWorld();
        this.playBgMusic();
        this.constantlyRespawnFishes();
    }


    /**
    * sets the world object for the character
    */
    setWorld() {
        this.character.world = this;
    }


    /**
    * draws the game world
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addBackground();
        this.addStaticObjects();
        this.addInstances();
        this.ctx.translate(-this.camera_x, 0);

        this.drawLoop();
    }


    /**
    * adds the background objects to the canvas
    */
    addBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.backgroundFishes);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.collectibles);
        this.addObjectsToMap(this.movableBubbles);
    }


    /**
    * adds the static objects to the canvas
    */
    addStaticObjects() {
        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addToMap(this.statusBarHP);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarPoisonAnimation);
        this.ctx.translate(this.camera_x, 0); // forward again
    }


    /**
    * adds all instances (characters, enemies, etc.) to the canvas
    */
    addInstances() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
    }


    /**
    * draw loop for continuous rendering if game isnt paused
    */
    drawLoop() {    // draw infinity loop
        let self = this;
        if (!pauseGame) {
            requestAnimationFrame(function () {
                self.draw();
            });
        } else {
            return
        }
    }


    /**
    * starts the game loop
    */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkForCollectedCoins();
            this.checkForCollectedPoison();
            this.respawnEnemies();
            addCoins(this.coinsCount);
        }, 200);
    }


    /**
    * adds objects to the map
    * @param {Array} objects - an array of objects to add to the map
    */
    addObjectsToMap(objects) {
        if (objects.length > 0) {
            objects.forEach(o => {
                this.addToMap(o);
            });
        }
    }


    /**
    * adds an object to the map, mirrors it if wanted
    * @param {Object} obj - the object to add to the map
    */
    addToMap(obj) {
        if (obj.otherDirection) {
            this.flipImage(obj);
        }
        obj.draw(this.ctx);
        if (obj.otherDirection) {
            this.flipImageBack(obj);
        }
    }


    /**
    * mirrors an image horizontally
    * @param {Object} obj - the object to mirror the image for
    */
    flipImage(obj) {
        this.ctx.save();
        this.ctx.translate(obj.width, 0);
        this.ctx.scale(-1, 1);
        obj.x = obj.x * -1;
    }


    /**
    * flips the image back to its original orientation
    * @param {Object} obj - the object to flip the image back for
    */
    flipImageBack(obj) {
        obj.x = obj.x * -1;
        this.ctx.restore();
    }


    /**
    * checks for collisions between objects in the world
    */
    checkCollisions() {
        this.checkEnemyCollision();
        this.checkEndbossCollision();
    }


    /**
    * checks for collisions between the character and standard enemies
    */
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.canGetHittedByEnemy(enemy)) {
                this.characterGetsHitted(characterHitFromCasualEnemy);
            }
            if (this.canNotGetHittedByEnemy(enemy)) {
                this.killEnemy(enemy);
            }
        });
    }


    /**
    * checks for collisions between the character and the end boss
    */
    checkEndbossCollision() {
        let endboss = this.level.endboss[0];
        if (this.canGetHittedByEndboss(endboss)) {
            this.characterGetsHitted(characterHitFromEndboss);
        }
        if (this.canNotGetHittedByEndboss(endboss)) {
            if (this.isNotInAttack(endboss)) {
                this.endbossGetsHitted(endboss);
            } else {
                this.characterGetsHitted(characterHitFromEndboss);
            }
        }
    }


    /**
    * checks for collisions between the bubble and objects
    */
    checkBubbleCollision(bubble) {
        let bblCollisionInterval = setInterval(() => {
            this.checkBubbleCollisionWithEnemy(bblCollisionInterval);
            this.checkBubbleCollisionWithEndboss(bblCollisionInterval);
            if (this.bubbleOutsideObservedWorld(bubble)) {
                this.deleteBubble();
            }
        }, 200);
    }


    /**
    * checks for collisions between the bubble and a standard enemy
    */
    checkBubbleCollisionWithEnemy(bblCollisionInterval) {
        this.level.enemies.forEach((enemy) => {
            if (bubble.isColliding(enemy)) {
                this.killEnemyWithBubble(enemy, bblCollisionInterval);
            }
        });
    }


    /**
    * checks for collisions between the bubble and endboss
    */
    characterHitFromEndboss(bblCollisionInterval) {
        let endboss = this.level.endboss[0];
        if (bubble.isColliding(endboss)) {
            this.hitEndbossWithBubble(endboss, bblCollisionInterval);
        }
    }


    /**
    * handles the character getting hit by an enemy or the end boss
    * @param {number} dmg - the damage value
    */
    characterGetsHitted(dmg) {
        this.character.hit(dmg);
        this.statusBarHP.setPercentage(this.character.hp);
    }


    /**
    * checks for collected coins by the character, if coin collected count goes up and coins gets deleted
    */
    checkForCollectedCoins() {
        let coinsIndex = -1;
        this.level.coins.forEach((coin) => {
            coinsIndex++;
            if (this.character.isColliding(coin)) {
                this.collectCoin(coinsIndex);
            }
        });
    }


    /**
    * checks for collected poison bottles by the character, if bottle collected status bar gets adjusted and bottle gets deleted
    */
    checkForCollectedPoison() {
        this.statusBarPoison.setPercentage(collectedPoison * 20);
        let poisonIndex = -1;
        this.level.collectibles.forEach((poison) => {
            poisonIndex++;
            if (this.character.isColliding(poison) && collectedPoison < 5) {
                this.collectPoison(poisonIndex);
            }
        });
    }


    /**
    * creates a bubble object and adds it to the movableBubbles array, status bar gets adjusted
    */
    createBubble() {
        let bubble = new Bubble(this.character.x + 380, this.character.y + 260);
        this.movableBubbles.push(bubble);
        this.checkBubbleCollision(bubble);
        playSound(BUBBLE_POP_SOUND);
        collectedPoison--;
    }


    /**
     * plays collect sound, adds points to score, deletes coin
     */
    collectCoin(coinsIndex) {
        playSound(COLLECT_SOUND);
        this.coinsCount += 5;
        this.level.coins.splice(coinsIndex, 1);
    }


    /**
     * plays collect sound, adds poison to status bar, deletes bottle
     */
    collectPoison(poisonIndex) {
        playSound(COLLECT_SOUND);
        collectedPoison++;
        this.level.collectibles.splice(poisonIndex, 1);
    }


    /**
     * pushes object into array to delete
     */
    killEnemy(enemy) {
        enemy.enemyDead = true;
        enemyToKill.push(enemy);
    }


    /**
     * pushes object into array to delete, plays sound, clears interval, deletes bubble
     */
    killEnemyWithBubble(enemy, bblCollisionInterval) {
        enemy.enemyDead = true;
        enemyToKill.push(enemy);
        this.movableBubbles.pop();
        clearInterval(bblCollisionInterval);
        playSound(ENEMY_DEAD_SOUND);
    }


    /**
     * endboss gets hitted
     */
    endbossGetsHitted(endboss) {
        endboss.hit();
        endboss.wasHitted = true;
    }


    /**
     * hits endboss, deletes bubble, clears interval
     */
    hitEndbossWithBubble(endboss, bblCollisionInterval) {
        endboss.hit();
        endboss.wasHitted = true;
        this.movableBubbles.pop();
        clearInterval(bblCollisionInterval);
    }


    /**
     * deletes last bubble, clears movement interval
     */
    deleteBubble() {
        this.movableBubbles.pop();
        clearInterval(bblCollisionInterval);
    }


    /**
    * plays the game background music
    */
    playBgMusic() {
        GAME_MUSIC.volume = 0.1;
        GAME_MUSIC.play();
    }


    /**
     * handles the game over conditions, shows endscreen after animations
     */
    gameOver() {
        inGame = false;
        characterAlive = false;
        gameWon = false;
        clearAllIntervals();
        stopAllSounds();
        GAMEOVER_SOUND.play();
        this.character.deadAnimation();
        setTimeout(showEndScreen, 2500);
    }


    /**
    * handles the game won conditions, shows endscreen after animations
    */
    gameWon() {
        inGame = false;
        killedEndbossCounter++;
        gameWon = true;
        clearAllIntervals();
        stopAllSounds();
        this.level.endboss[0].deadAnimation();
        setTimeout(showEndScreen, 2000);
    }


    /**
     * pauses game and shows pause screen or continues game and hides pause screen
     */
    pauseGame() {
        if (!pauseGame) {
            pauseGame = true;
            showPauseScreen();
            return;
        }
        if (pauseGame) {
            pauseGame = false;
            this.continueGame();
            deletePauseScreen();
        }
    }


    /**
     * continues the game world drawing after pause
     */
    continueGame() {
        this.draw();
    }


    /**
    * respawns background fishes constantly after given time
    */
    constantlyRespawnFishes() {
        setInterval(() => {
            if (!pauseGame) {
                this.level.backgroundFishes.push(
                    new BackgroundFish()
                );
            }
        }, this.bgFishRespawnInterval);
    }


    /**
    * respawns enemies in the level if character moves forward
    */
    respawnEnemies() {
        if (this.inRangeToSpawnNewEnemies()) {
            this.level.enemies.push(
                new Enemy_1(),
            );
            this.enemySpawnCounter++;
        }
    }


    /**
    * deletes an object (standard enemy) from the level and counts it
    */
    deleteObject(obj) {
        let index = this.level.enemies.indexOf(obj);
        if (index !== -1) {
            this.level.enemies.splice(index, 1);
        }
        killedPufferFishCounter++;
    }


    /**
    * returns true if the character is in range to spawn a new enemy
    */
    inRangeToSpawnNewEnemies() {
        return (characterPosition > this.character.x_default + (this.enemyRespawnDistance * this.enemySpawnCounter)) && !(characterPosition > this.lastEnemyRespawnBeforeEndboss);
    }


    /**
     * returns true if the bubble position is outside the field of view
     */
    bubbleOutsideObservedWorld(bubble) {
        return bubble.x > this.character.x + 1700;
    }


    /**
     * returns true if endboss is not attacking and not already hit
     */
    isNotInAttack() {
        return endboss.attackTimeoutActive && !endboss.wasHitted;
    }


    /**
     * returns true if objects colliding, character not attacking, enemy alive and no damaged timeout active
     */
    canGetHittedByEnemy(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAttacking && !enemy.enemyDead && !this.character.characterDamageTimeout;
    }


    /**
     * returns true if objects colliding but character is attacking
     */
    canNotGetHittedByEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.isAttacking;
    }


    /**
     * returns true if objects colliding, character not attacking, endboss alive and no damaged timeout active
     */
    canGetHittedByEndboss(endboss) {
        return this.character.isColliding(endboss) && !this.character.isAttacking && endboss.endbossAlive && !endboss.characterDamageTimeout;
    }


    /**
     * returns true if objects colliding but character is attacking and endboss alive and no damaged timeout active
     */
    canNotGetHittedByEndboss(endboss) {
        return this.character.isColliding(endboss) && this.character.isAttacking && endboss.endbossAlive && !endboss.characterDamageTimeout;
    }
}