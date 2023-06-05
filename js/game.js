let canvas;
let world;
let keyboard = new Keyboard();
let characterPosition;
let characterAlive = true;
let pauseGame = false;
let sound = true;

function initWorld() {
    addCoinsCountContainer();
    addCoins(0);
    initLevel_1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.JUMP = true;
    }
    if (event.keyCode == 13 && event.keyCode == 68) {
        keyboard.THROW = true;
    }
    if (event.keyCode == 27) {
        keyboard.MENU = true;
        world.pauseGame();
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.JUMP = false;
    }
    if (event.keyCode == 13 && event.keyCode == 68) {
        keyboard.THROW = false;
    }
    if (event.keyCode == 27) {
        keyboard.MENU = false;
    }
});