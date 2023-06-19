let canvas;
let world;
let keyboard = new Keyboard();
let characterPosition = 0;
let inGame = false;
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

let difficulty = 2;
let endbossHealthPoints = 250;
let characterHitFromCasualEnemy = 10;
let characterHitFromEndboss = 25;
let casualEnemyMinSpeed = 0.2;
let casualEnemyMaxSpeed = 0.6;


function initWorld() {
    addCoinsCountContainer();
    inGame = true;
    setTimeout(addCoins, 400, 0);
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
    if (event.keyCode == 18 && !pauseGame) {
        event.preventDefault();
        keyboard.ALT = true;
    }
    if (event.keyCode == 9) {
        event.preventDefault();
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
        world.character.bubbleAnimationTimeout = false;
        world.character.bubbleAnimationCount = 0;
    }
    if (event.keyCode == 9) {
        keyboard.TAB = false;
    }
});

function changeDifficulty(dfc) {
    difficulty = dfc;
    if (dfc == 1) {
        endbossHealthPoints = 150;
        characterHitFromCasualEnemy = 5;
        characterHitFromEndboss = 15;
        casualEnemyMinSpeed = 0.15;
        casualEnemyMaxSpeed = 0.4;
    }
    if (dfc == 2) {
        endbossHealthPoints = 250;
        characterHitFromCasualEnemy = 10;
        characterHitFromEndboss = 25;
        casualEnemyMinSpeed = 0.25;
        casualEnemyMaxSpeed = 0.6;
    }
    if (dfc == 3) {
        endbossHealthPoints = 250;
        characterHitFromCasualEnemy = 20;
        characterHitFromEndboss = 35;
        casualEnemyMinSpeed = 1.6;
        casualEnemyMaxSpeed = 2;
    }
    if (dfc == 4) {
        endbossHealthPoints = 400;
        characterHitFromCasualEnemy = 30;
        characterHitFromEndboss = 35;
        casualEnemyMinSpeed = 3;
        casualEnemyMaxSpeed = 4;
    }
}