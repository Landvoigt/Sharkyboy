class Endboss extends MovableObject {
    x = 5000;
    y = 0;
    height = 950;
    width = 950;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    SPAWNING_IMG = [
        '../img/enemies/endboss/introduction/(1).png',
        '../img/enemies/endboss/introduction/(2).png',
        '../img/enemies/endboss/introduction/(3).png',
        '../img/enemies/endboss/introduction/(4).png',
        '../img/enemies/endboss/introduction/(5).png',
        '../img/enemies/endboss/introduction/(6).png',
        '../img/enemies/endboss/introduction/(7).png',
        '../img/enemies/endboss/introduction/(8).png',
        '../img/enemies/endboss/introduction/(9).png',
        '../img/enemies/endboss/introduction/(10).png'
    ];
    IDLE_IMG = [
        '../img/enemies/endboss/swim/(1).png',
        '../img/enemies/endboss/swim/(2).png',
        '../img/enemies/endboss/swim/(3).png',
        '../img/enemies/endboss/swim/(4).png',
        '../img/enemies/endboss/swim/(5).png',
        '../img/enemies/endboss/swim/(6).png',
        '../img/enemies/endboss/swim/(7).png',
        '../img/enemies/endboss/swim/(8).png',
        '../img/enemies/endboss/swim/(9).png',
        '../img/enemies/endboss/swim/(10).png',
        '../img/enemies/endboss/swim/(11).png',
        '../img/enemies/endboss/swim/(12).png',
        '../img/enemies/endboss/swim/(13).png'
    ];
    endbossReached = false;


    constructor() {
        super();
        this.loadImages(this.SPAWNING_IMG);
        this.loadImages(this.IDLE_IMG);
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 10 && this.endbossReached) {
                this.playAnimation(this.SPAWNING_IMG);
            } else if (this.endbossReached) {
                this.playAnimation(this.IDLE_IMG);
            }
            i++;
            if (characterPosition > 3700 && !this.endbossReached) {
                i = 0;
                this.endbossReached = true;
            }
        }, 200);
    }

    // unitsBeforeCharacterHasToSpawn = 60 + 1300;

}