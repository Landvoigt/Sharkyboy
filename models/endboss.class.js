class Endboss extends MovableObject {
    x = 1000;
    y = 0;
    width = 950;
    height = 950;
    offset = {
        x: 60,
        width: 80,
        y: 450,
        height: 175,
    };
    animationTime = 200;
    pointOfSpawnAnimationStarting_unitsBeforeCharacterHasToSpawn = 60 + 1300;

    constructor() {
        super().loadImage(KILLERWHALE_SPAWN_IMG[0]);
        this.load();
        this.animate();
    }

    load() {
        this.loadImages(KILLERWHALE_SPAWN_IMG);
        this.loadImages(KILLERWHALE_IDLE_IMG);
        this.loadImages(KILLERWHALE_ATTACK_IMG);
        this.loadImages(KILLERWHALE_HURT_IMG);
        this.loadImages(KILLERWHALE_DEAD_IMG);
    }

    animate() {
        let i = 0;
        setInterval(() => {
            // console.log(world.endbossReached);
            // if (characterPosition > 3700 && !world.endbossReached) {
            //     world.endbossReached = true;
            //     i = 0;
            // }
            // if (i < 10 && world.endbossReached) {
            //     this.playAnimation(KILLERWHALE_SPAWN_IMG);
            // } else if (world.endbossReached) {
            this.playAnimation(KILLERWHALE_IDLE_IMG);
            // }
            // i++;
        }, this.animationTime);
    }
}