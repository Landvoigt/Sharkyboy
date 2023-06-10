let level_1;

function initLevel_1() {
    level_1 = new Level(
        [
            // new Enemy_1(),
            // new Endboss(),
        ],
        [
            new Endboss(),
        ],
        [
            new BackgroundObject('../img/background/water/2.png', -1920),
            new BackgroundObject('../img/background/layer_1/2.png', -1920),
            new BackgroundObject('../img/background/layer_2/1.png', -1920),
            new BackgroundObject('../img/background/floor/2.png', -1920),
            new BackgroundObject('../img/background/light/1.png', -1920),

            new BackgroundObject('../img/background/water/1.png', 0),
            new BackgroundObject('../img/background/layer_1/1.png', 0),
            new BackgroundObject('../img/background/layer_2/2.png', 0),
            new BackgroundObject('../img/background/floor/1.png', 0),
            new BackgroundObject('../img/background/light/2.png', 0),

            new BackgroundObject('../img/background/water/2.png', 1920),
            new BackgroundObject('../img/background/layer_1/2.png', 1920),
            new BackgroundObject('../img/background/layer_2/1.png', 1920),
            new BackgroundObject('../img/background/floor/2.png', 1920),
            new BackgroundObject('../img/background/light/1.png', 1920),

            new BackgroundObject('../img/background/water/1.png', 1920 * 2),
            new BackgroundObject('../img/background/layer_1/1.png', 1920 * 2),
            new BackgroundObject('../img/background/layer_2/2.png', 1920 * 2),
            new BackgroundObject('../img/background/floor/1.png', 1920 * 2),
            new BackgroundObject('../img/background/light/2.png', 1920 * 2),

            new BackgroundObject('../img/background/water/2.png', 1920 * 3),
            new BackgroundObject('../img/background/layer_1/2.png', 1920 * 3),
            new BackgroundObject('../img/background/layer_2/1.png', 1920 * 3),
            new BackgroundObject('../img/background/floor/2.png', 1920 * 3),
            new BackgroundObject('../img/background/light/1.png', 1920 * 3)
        ],
        [
            new BackgroundFish(),
            new BackgroundFish(),
            new BackgroundFish(),
            new BackgroundFish(),
            new BackgroundFish()
        ],
        [
            new Coin(1200, 900),
            new Coin(1300, 900),
            new Coin(1400, 900),
            new Coin(1500, 900)
        ],
        [
            new PoisonBottle(1600, 900),
            new PoisonBottle(1700, 900)
        ]
    );
}