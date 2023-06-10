class Level {
    enemies;
    endboss;
    backgroundObjects;
    backgroundFishes;
    coins;
    collectibles;
    levelEnd_x = 5000;

    constructor(enemies, endboss, backgroundObjects, backgroundFishes, coins, collectibles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
        this.backgroundFishes = backgroundFishes;
        this.coins = coins;
        this.collectibles = collectibles;
    }
}