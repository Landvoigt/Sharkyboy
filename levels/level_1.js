let level_1;

function initLevel_1() {
    level_1 = new Level(
        [
            new Enemy_1(),
            new Enemy_1(),
            new Enemy_1(),
            new Endboss()
        ],
        [
            new BackgroundObject('../img/background/water/2.png', -1920),
            new BackgroundObject('../img/background/layer_1/2.png', -1920),
            new BackgroundObject('../img/background/layer_2/1.png', -1920),
            new BackgroundObject('../img/background/floor/2.png', -1920),

            new BackgroundObject('../img/background/water/1.png', 0),
            new BackgroundObject('../img/background/layer_1/1.png', 0),
            new BackgroundObject('../img/background/layer_2/2.png', 0),
            new BackgroundObject('../img/background/floor/1.png', 0),

            new BackgroundObject('../img/background/water/2.png', 1920),
            new BackgroundObject('../img/background/layer_1/2.png', 1920),
            new BackgroundObject('../img/background/layer_2/1.png', 1920),
            new BackgroundObject('../img/background/floor/2.png', 1920),

            new BackgroundObject('../img/background/water/1.png', 1920 * 2),
            new BackgroundObject('../img/background/layer_1/1.png', 1920 * 2),
            new BackgroundObject('../img/background/layer_2/2.png', 1920 * 2),
            new BackgroundObject('../img/background/floor/1.png', 1920 * 2),

            new BackgroundObject('../img/background/water/2.png', 1920 * 3),
            new BackgroundObject('../img/background/layer_1/2.png', 1920 * 3),
            new BackgroundObject('../img/background/layer_2/1.png', 1920 * 3),
            new BackgroundObject('../img/background/floor/2.png', 1920 * 3)
        ],
        [
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish(),
            new Background_Fish()
        ]
    );
}