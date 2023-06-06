class Endboss extends MovableObject {
    x = 5000;
    y = 0;
    width = 950;
    height = 950;
    offset = {
        x: 0,
        height: 0,
        y: 0,
        width: 0,
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

    constructor() {
        super().loadImage(this.SPAWNING_IMG[0]);
        this.loadImages(this.SPAWNING_IMG);
        this.loadImages(this.IDLE_IMG);
        this.animate();
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (!this.endbossReached && characterPosition > 3700) {
                i = 0;
                this.endbossReached = true;
            }
            if (i < 10 && this.endbossReached) {
                this.playAnimation(this.SPAWNING_IMG);
            } else if (this.endbossReached) {
                this.playAnimation(this.IDLE_IMG);
            }
            i++;
            // console.log(this.endbossReached);
            // console.log(characterPosition);
        }, 200);
    }

    // unitsBeforeCharacterHasToSpawn = 60 + 1300;
}