class World {
    character = new Character();
    level = level_1;
    statusBarHP = new StatusBar(HP_BAR_IMG, 25, -5, 'hp');
    statusBarCoin = new StatusBar(POISON_BAR_IMG, 1510, -5, 'poison');
    statusBarPoison = new StatusBar(COINS_BAR_IMG, 840, 20, 'coin');
    statusBarPoisonAnimation = new PoisonBottle(1825, -12);
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [
        // new ThrowableObject()
    ];
    movementCache = [];
    currentSpeedParam;
    coinsCount = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.run();
        this.draw();
        this.setWorld();
        // this.playBgMusic();
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
    }

    addStaticObjects() {
        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addToMap(this.statusBarHP);
        this.addToMap(this.statusBarPoison);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarPoisonAnimation);
        this.ctx.translate(this.camera_x, 0); // forward again
    }

    addInstances() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    drawLoop() {
        // draw infinity loop
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
            addCoins(this.coinsCount);
            // this.checkThrowObject();
        }, 200);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        mo.drawFrame(this.ctx);
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
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHP.setPercentage(this.character.hp);
            } else {
                return // console.log('not colliding');
            }
        });
    }

    checkForCollectedCoins() {
        let coinsIndex = -1;
        this.level.coins.forEach((coin) => {
            coinsIndex++;
            if (this.character.isColliding(coin)) {
                this.coinsCount += 5;
                this.level.coins.splice(coinsIndex, 1);
            } else {
                return
            }
        });
    }

    checkThrowObject() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    playBgMusic() {
        GAME_MUSIC.volume = 0.1;
        GAME_MUSIC.play();
    }

    gameOver() {
        clearAllIntervals();
        characterAlive = false;
        GAME_MUSIC.pause();
        SWIMMING_SOUND.pause();
        GAMEOVER_SOUND.play();
        this.character.deadAnimation();
    }

    pauseGame() {
        if (!pauseGame) {
            this.stopAllMovement();
            pauseGame = true;
            return;
        }
        if (pauseGame) {
            pauseGame = false;
            this.continueGame();
        }
    }

    stopAllMovement() {
        this.level.enemies.forEach(e => {
            this.stopMovement(e);
        });
        this.level.backgroundFishes.forEach(e => {
            this.stopMovement(e);
        });
    }

    stopMovement(obj) {
        let currentSpeed = obj.speed;
        this.movementCache.push(currentSpeed);
        obj.speed = 0;
    }

    continueGame() {
        this.draw();
        this.continueAllMovement();
    }

    continueAllMovement() {
        this.level.enemies.forEach(e => {
            this.continueMovement(e);
        });
        this.level.backgroundFishes.forEach(e => {
            this.continueMovement(e);
        });
    }

    continueMovement(obj) {
        this.currentSpeedParam = 0;
        obj.speed = this.movementCache[this.currentSpeedParam];
        this.currentSpeedParam++;
    }
}