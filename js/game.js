let canvas;
let world;
let keyboard = new Keyboard();
let characterPosition = 0;
let characterAlive = true;
let pauseGame = false;
let sound = true;
let endbossReached = false;
let collectedPoison = 0;
let startAttackTimer = 0;
let stopAttackTimer = new Date().getTime();
let enemyToKill = [];
let killedPufferFishCounter = 0;
let killedEndbossCounter = 0;
let gameWon;
let fullscreen;
const elem = document.documentElement;


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
    if (event.keyCode == 39 && !pauseGame || event.keyCode == 68 && !pauseGame) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37 && !pauseGame || event.keyCode == 65 && !pauseGame) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38 && !pauseGame || event.keyCode == 87 && !pauseGame) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40 && !pauseGame || event.keyCode == 83 && !pauseGame) {
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
    if (event.keyCode == 18 && !pauseGame && collectedPoison > 0) {
        keyboard.ALT = true;
    }
    if (event.keyCode == 9) {
        keyboard.TAB = true;
        world.pauseGame();
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37 || event.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38 || event.keyCode == 87) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40 || event.keyCode == 83) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        stopAttackTimer = new Date().getTime();
        world.character.isAttacking = false;
        keyboard.SPACEBAR = false;
    }
    if (event.keyCode == 18) {
        keyboard.ALT = false;
    }
    if (event.keyCode == 9) {
        keyboard.TAB = false;
    }
});