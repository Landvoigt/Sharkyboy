class Level {
    enemies;
    backgroundObjects;
    backgroundFishes;
    coins;
    collectibles;
    levelEnd_x = 5000;

    constructor(enemies, backgroundObjects, backgroundFishes, coins, collectibles) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.backgroundFishes = backgroundFishes;
        this.coins = coins;
        this.collectibles = collectibles;
    }
}