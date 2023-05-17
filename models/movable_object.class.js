class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 150;
    speed = 0.5;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr -['blabla.png','blabla.png2',...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        // Swim Animation
        let i = this.currentImage % images.length; // infinity loop for elements in array 0,1,2,3,....,0,1,2,3...,0,1,2
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}