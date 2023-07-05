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

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addBackground();
        this.addStaticObjects();
        this.addInstances();
        this.ctx.translate(-this.camera_x, 0);

        this.drawLoop();
    }

    addBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.backgroundFishes);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.collectibles);
        this.addObjectsToMap(this.movableBubbles);
    }

    addStaticObjects() {
        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addToMap(this.statusBarHP);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarPoisonAnimation);
        this.ctx.translate(this.camera_x, 0); // forward again
    }

    addInstances() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
    }

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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkForCollectedCoins();
            this.checkForCollectedPoison();
            this.respawnEnemies();
            addCoins(this.coinsCount);
        }, 200);
    }

    addObjectsToMap(objects) {
        if (objects.length > 0) {
            objects.forEach(o => {
                this.addToMap(o);
            });
        }
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        // mo.drawFrame(this.ctx);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    checkCollisions() {
        this.checkEnemyCollision();
        this.checkEndbossCollision();
    }

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

    characterGetsHitted(dmg) {
        this.character.hit(dmg);
        this.statusBarHP.setPercentage(this.character.hp);
    }

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

    createBubble() {
        let bubble = new Bubble(this.character.x + 380, this.character.y + 260);
        this.movableBubbles.push(bubble);
        this.checkBubbleCollision(bubble);
    }

    playBgMusic() {
        GAME_MUSIC.volume = 0.1;
        GAME_MUSIC.play();
    }

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

    gameWon() {
        inGame = false;
        killedEndbossCounter++;
        gameWon = true;
        clearAllIntervals();
        stopAllSounds();
        this.level.endboss[0].deadAnimation();
        setTimeout(showEndScreen, 2000);
    }

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

    continueGame() {
        this.draw();
    }

    constantlyRespawnFishes() {
        setInterval(() => {
            if (!pauseGame) {
                this.level.backgroundFishes.push(
                    new BackgroundFish()
                );
            }
        }, this.bgFishRespawnInterval);
    }

    respawnEnemies() {
        if (this.inRangeToSpawnNewEnemies()) {
            this.level.enemies.push(
                new Enemy_1(),
            );
            this.enemySpawnCounter++;
        }
    }

    deleteObject(obj) {
        let index = this.level.enemies.indexOf(obj);
        if (index !== -1) {
            this.level.enemies.splice(index, 1);
        }
        killedPufferFishCounter++;
    }

    inRangeToSpawnNewEnemies() {
        return (characterPosition > this.character.x_default + (this.enemyRespawnDistance * this.enemySpawnCounter)) && !(characterPosition > this.lastEnemyRespawnBeforeEndboss);
    }
}