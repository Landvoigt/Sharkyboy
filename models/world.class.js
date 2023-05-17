class World {
    character = new Character();
    enemies = [
        new Enemy_1(),
        new Enemy_1(),
        new Enemy_1()
    ];

    backgroundObjects = [
        new BackgroundObject('../img/3. Background/Legacy/Layers/5. Water/d1.png', 0),
        new BackgroundObject('../img/3. Background/Legacy/Layers/4.Fondo 2/L1.png', 0),
        new BackgroundObject('../img/3. Background/Legacy/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 0)
    ];

    backgroundFishes = [
        new Background_Fish(),
        new Background_Fish(),
        new Background_Fish()
    ];

    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.backgroundFishes);
        this.addObjectsToMap(this.enemies);

        // draw infinity loop
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width);
    }
}