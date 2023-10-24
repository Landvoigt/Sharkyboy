let canvas;
let world;
let keyboard = new Keyboard();
let characterPosition = 0;
let inGame = false;
let characterAlive = true;
let pauseGame = false;
let sound = true;
let endbossReached = false;
let endbossSpawned = false;
let endbossPosX = 10000;
let endbossPosY = 0;
let collectedPoison = 0;
let startAttackTimer = 0;
let stopAttackTimer = new Date().getTime();
let enemyToKill = [];
let killedPufferFishCounter = 0;
let killedEndbossCounter = 0;
let gameWon;
let fullscreen;
let onSettingsPage = false;
const elem = document.documentElement;
let highlightCache = {
    fullscreen: 1,
    sound: 1,
    difficulty: 2
}


/**
 * loads the world, adds the collected coins container
 */
function initWorld() {
    addCoinsCountContainer();
    inGame = true;
    setTimeout(addCoins, 400, 0);
    initLevel_1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * stops all intervals
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * stops all timeouts
 */
function clearAllTimeouts() {
    for (let i = 1; i < 9999; i++) window.clearTimeout(i);
}


/**
 * adds the keydown events
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39 && !pauseGame || event.keyCode == 68 && !pauseGame) {
        event.preventDefault();
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37 && !pauseGame || event.keyCode == 65 && !pauseGame) {
        event.preventDefault();
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38 && !pauseGame || event.keyCode == 87 && !pauseGame) {
        event.preventDefault();
        keyboard.UP = true;
    }
    if (event.keyCode == 40 && !pauseGame || event.keyCode == 83 && !pauseGame) {
        event.preventDefault();
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32 && !pauseGame) {
        event.preventDefault();
        if (stopAttackTimer > startAttackTimer && !keyboard.SPACEBAR) {
            // allow attack only after 0.7 sec has passed, prevent spamming of attack keypress
            if ((new Date().getTime() - startAttackTimer) > 700) {
                startAttackTimer = new Date().getTime();
                world.character.attackAnimationCount = 0;
            }
            keyboard.SPACEBAR = true;
        }
    }
    if (event.keyCode == 17 && !pauseGame) {
        event.preventDefault();
        keyboard.CTRL = true;
    }
    if (event.keyCode == 18) {
        event.preventDefault();
    }
    if (event.keyCode == 9) {
        event.preventDefault();
        keyboard.TAB = true;
        pauseRunningGame();
    }
});


/**
 * adds the keyup events
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39 || event.keyCode == 68) {
        event.preventDefault();
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37 || event.keyCode == 65) {
        event.preventDefault();
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38 || event.keyCode == 87) {
        event.preventDefault();
        keyboard.UP = false;
    }
    if (event.keyCode == 40 || event.keyCode == 83) {
        event.preventDefault();
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        event.preventDefault();
        stopAttackTimer = new Date().getTime();
        world.character.isAttacking = false;
        keyboard.SPACEBAR = false;
    }
    if (event.keyCode == 17) {
        event.preventDefault();
        keyboard.CTRL = false;
        // resets the animation images
        world.character.bubbleAnimationTimeout = false;
        world.character.bubbleAnimationCount = 0;
    }
    if (event.keyCode == 18) {
        event.preventDefault();
    }
    if (event.keyCode == 9) {
        event.preventDefault();
        keyboard.TAB = false;
    }
});


/**
 * binds the mobile buttons for mobile interaction
 */
function bindMobileBtnEvents() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnDown').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.DOWN = true;
    });

    document.getElementById('btnDown').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.DOWN = false;
    });

    document.getElementById('btnAttack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (stopAttackTimer > startAttackTimer && !keyboard.SPACEBAR) {
            if ((new Date().getTime() - startAttackTimer) > 800) {
                startAttackTimer = new Date().getTime();
                world.character.attackAnimationCount = 0;
            }
            keyboard.SPACEBAR = true;
        }
    });

    document.getElementById('btnAttack').addEventListener('touchend', (e) => {
        e.preventDefault();
        stopAttackTimer = new Date().getTime();
        world.character.isAttacking = false;
        keyboard.SPACEBAR = false;
    });

    document.getElementById('btnBubble').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.CTRL = true;
    });

    document.getElementById('btnBubble').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.CTRL = false;
        world.character.bubbleAnimationTimeout = false;
        world.character.bubbleAnimationCount = 0;
    });

    document.getElementById('btnPause').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.TAB = true;
        pauseRunningGame();
    });

    document.getElementById('btnPause').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.TAB = false;
    });
}