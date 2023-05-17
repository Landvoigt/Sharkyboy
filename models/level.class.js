class Level {
    enemies;
    backgroundObjects;
    backgroundFishes;
    levelEnd_x = 5000;

    constructor(enemies, backgroundObjects, backgroundFishes) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.backgroundFishes = backgroundFishes;
    }
}