class World {
    character = new Character();
    level = level_1;
    statusBar = [
        new StatusBar(COINS_BAR_IMG, 70, 'poison'),
        new StatusBar(POISON_BAR_IMG, 150, 'coin')
    ];
    statusBarHP = new StatusBar(HP_BAR_IMG, -10, 'hp');
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [
        // new ThrowableObject()
    ];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();
        // this.playBgMusic();
        this.setWorld();
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
    }

    addStaticObjects() {
        this.ctx.translate(-this.camera_x, 0); // back
        // space for fixed objects
        this.addObjectsToMap(this.statusBar);
        this.addToMap(this.statusBarHP);
        this.ctx.translate(this.camera_x, 0); // forward again
    }

    addInstances() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.backgroundFishes);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    drawLoop() {
        // draw infinity loop
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
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

}