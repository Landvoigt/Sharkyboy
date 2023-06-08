let canvas;
let world;
let keyboard = new Keyboard();
let characterPosition = 0;
let characterAlive = true;
let pauseGame = false;
let sound = true;
let collectedPoison = 0;
let startAttackTimer = 0;
let stopAttackTimer = new Date().getTime();
let enemyToKill = [];


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

function clearAllTimeouts() {
    for (let i = 1; i < 9999; i++) window.clearTimeout(i);
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39 && !pauseGame) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37 && !pauseGame) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38 && !pauseGame) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40 && !pauseGame) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32 && !pauseGame) {
        if (stopAttackTimer > startAttackTimer && !keyboard.SPACEBAR) {
            // allow attack only after 1 sec has passed, prevent spamming of attack keypress
            if ((new Date().getTime() - startAttackTimer) > 800) {
                startAttackTimer = new Date().getTime();
                world.character.attackAnimationCount = 0;
            }
            keyboard.SPACEBAR = true;
        }
    }
    if (event.keyCode == 13 && event.keyCode == 68 && !pauseGame) {
        keyboard.THROW = true;
    }
    if (event.keyCode == 27) {
        keyboard.ESC = true;
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
        stopAttackTimer = new Date().getTime();
        world.character.isAttacking = false;
        keyboard.SPACEBAR = false;
    }
    if (event.keyCode == 13 && event.keyCode == 68) {
        keyboard.THROW = false;
    }
    if (event.keyCode == 27) {
        keyboard.ESC = false;
    }
});