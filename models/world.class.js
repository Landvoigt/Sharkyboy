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
            if (this.character.isColliding(enemy) && !this.character.isAttacking && !enemy.enemyDead) {
                this.characterGetsHitted(characterHitFromCasualEnemy);
            }
            if (this.character.isColliding(enemy) && this.character.isAttacking) {
                enemy.enemyDead = true;
                enemyToKill.push(enemy);
            }
        });
    }


    /**
    * checks for collisions between the character and the end boss
    */
    checkEndbossCollision() {
        let endboss = this.level.endboss[0];
        if (this.character.isColliding(endboss) && !this.character.isAttacking && endboss.endbossAlive) {
            this.characterGetsHitted(characterHitFromEndboss);
        }
        if (this.character.isColliding(endboss) && this.character.isAttacking && endboss.endbossAlive) {
            if (endboss.attackTimeoutActive && !endboss.wasHitted) {
                endboss.hit();
                endboss.wasHitted = true;
            } else {
                this.characterGetsHitted(characterHitFromEndboss);
            }
        }
    }


    /**
    * checks for collisions between the bubble and enemies
    */
    checkBubbleCollision(bubble) {
        let bblCollisionInterval = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (bubble.isColliding(enemy)) {
                    enemy.enemyDead = true;
                    enemyToKill.push(enemy);
                    this.movableBubbles.pop();
                    clearInterval(bblCollisionInterval);
                    playSound(ENEMY_DEAD_SOUND);
                }
            });
            let endboss = this.level.endboss[0];
            if (bubble.isColliding(endboss)) {
                endboss.hit();
                endboss.wasHitted = true;
                this.movableBubbles.pop();
                clearInterval(bblCollisionInterval);
            }
            if (bubble.x > this.character.x + 1700) {
                this.movableBubbles.pop();
                clearInterval(bblCollisionInterval);
            }
        }, 200);
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
                playSound(COLLECT_SOUND);
                this.coinsCount += 5;
                this.level.coins.splice(coinsIndex, 1);
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
                playSound(COLLECT_SOUND);
                collectedPoison++;
                this.level.collectibles.splice(poisonIndex, 1);
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
}