let level_1;


/**
 * loads all objects of the first level
 */
function initLevel_1() {
    level_1 = new Level(
        [],
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
            new BackgroundObject('../img/background/light/1.png', 1920 * 3),

            new BackgroundObject('../img/background/water/1.png', 1920 * 4),
            new BackgroundObject('../img/background/layer_1/1.png', 1920 * 4),
            new BackgroundObject('../img/background/layer_2/2.png', 1920 * 4),
            new BackgroundObject('../img/background/floor/1.png', 1920 * 4),
            new BackgroundObject('../img/background/light/2.png', 1920 * 4),

            new BackgroundObject('../img/background/water/2.png', 1920 * 5),
            new BackgroundObject('../img/background/layer_1/2.png', 1920 * 5),
            new BackgroundObject('../img/background/layer_2/1.png', 1920 * 5),
            new BackgroundObject('../img/background/floor/2.png', 1920 * 5),
            new BackgroundObject('../img/background/light/1.png', 1920 * 5),

            new BackgroundObject('../img/background/water/1.png', 1920 * 6),
            new BackgroundObject('../img/background/layer_1/1.png', 1920 * 6),
            new BackgroundObject('../img/background/layer_2/2.png', 1920 * 6),
            new BackgroundObject('../img/background/floor/1.png', 1920 * 6),
            new BackgroundObject('../img/background/light/2.png', 1920 * 6),
        ],
        [
            new BackgroundFish(),
            new BackgroundFish(),
            new BackgroundFish(),
            new BackgroundFish(),
            new BackgroundFish()
        ],
        [
            new Coin(1660, 960),
            new Coin(1770, 900),
            new Coin(1880, 840),
            new Coin(2400, 380),
            new Coin(2900, 600),
            new Coin(3020, 650),
            new Coin(3140, 620),
            new Coin(4000, 980),
            new Coin(4200, 970),
            new Coin(4700, 500),
            new Coin(5200, 400),
            new Coin(5310, 350),
            new Coin(5420, 300),
            new Coin(6220, 940),
            new Coin(7020, 940),
            new Coin(7140, 900),
            new Coin(7800, 570),
            new Coin(8100, 940),
            new Coin(8200, 960),
            new Coin(8300, 970)
        ],
        [
            new PoisonBottle(-440, 910),
            new PoisonBottle(3100, 910),
            new PoisonBottle(5140, 800),
            new PoisonBottle(6120, 400),
            new PoisonBottle(7210, 910)
        ]
    );
}