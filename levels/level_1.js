const level_1 = new Level(
    [
        new Enemy_1(),
        new Enemy_1(),
        new Enemy_1(),
        new Endboss()
    ],
    [
        new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', -1920),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L2.png', -1920),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', -1920),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', -1920),

        new BackgroundObject('../img/3. Background/Layers/5. Water/d1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 0),

        new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', 1920),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L2.png', 1920),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', 1920),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', 1920),

        new BackgroundObject('../img/3. Background/Layers/5. Water/d1.png', 1920 * 2),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L1.png', 1920 * 2),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 1920 * 2),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 1920 * 2),

        new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', 1920 * 3),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/L2.png', 1920 * 3),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', 1920 * 3),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', 1920 * 3)
    ],
    [
        new Background_Fish(),
        new Background_Fish(),
        new Background_Fish()
    ]
);