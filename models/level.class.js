class Level {
    enemies;
    endboss;
    backgroundObjects;
    backgroundFishes;
    coins;
    collectibles;
    levelStart_x = -550;
    levelEndzoneStart_x = 8000;
    levelEnd_x = 11500;

    /**
    * creates an instance of Level
    */
    constructor(enemies, endboss, backgroundObjects, backgroundFishes, coins, collectibles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
        this.backgroundFishes = backgroundFishes;
        this.coins = coins;
        this.collectibles = collectibles;
    }
}