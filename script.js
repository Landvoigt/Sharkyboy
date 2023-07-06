/**
 * shows the startpage, pushes audios into array
 */
function initialize() {
    showStartpage();
    pushAudios();
}


/**
 * checks the device then runs the game
 */
function startGame() {
    let startscreen = document.getElementById('startscreen');
    checkDevice(startscreen);
    setTimeout(createCanvas, 2500);
}


/**
 * generates the canvas
 */
function createCanvas() {
    document.getElementById('content').innerHTML = getContentHTML();
    initWorld();
    bindMobileBtnEvents();
    stopSound(MENU_SOUND);
    playSound(START_SOUND);
    GAME_MUSIC.volume = 0.1;
    playSound(GAME_MUSIC);
}


/**
 * loads touchable buttons on mobile devices
 */
window.onload = function () {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        loadMobileKeys();
    }
};


/**
 * shows touchable buttons on mobile devices
 */
function loadMobileKeys() {
    let movement = document.getElementById('mobileMovement');
    let attack = document.getElementById('mobileAttack');
    let pause = document.getElementById('mobilePause');
    movement.style = 'display: flex';
    attack.style = 'display: flex';
    pause.style = 'display: flex';
}


/**
 * shows startpage
 */
function showStartpage() {
    onSettingsPage = false;
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.remove('change-display');
    startscreen.innerHTML = getStartpageHMTL();
}


/**
 * shows navigation page
 */
function showNavigation() {
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    checkDevice(startscreen);
    startscreen.innerHTML += getHomeButtonHTML();
}


/**
 * shows different game keybindings based on the device
 */
function checkDevice(startscreen) {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        startscreen.innerHTML = getNavigationHTMLMobile();
    } else {
        startscreen.innerHTML = getNavigationHTMLDesktop();
    }
}


/**
 * hides the pause screen, resets sounds and variables, shows startpage
 */
function returnToStartpage() {
    deletePauseScreen();
    stopAllSounds();
    resetGameVariables();
    changeDifficulty(currentDifficulty);
    document.getElementById('content').innerHTML = `<div class="startscreen" id="startscreen"></div>`;
    showStartpage();
    playSound(MENU_SOUND);
}


/**
 * resets some game variables to start the game again
 */
function resetGameVariables() {
    inGame = false;
    pauseGame = false;
    characterAlive = true;
    endbossReached = false;
    gameWon = '';
    collectedPoison = 0;
    killedPufferFishCounter = 0;
    killedEndbossCounter = 0;
    world.level.endboss[0].endbossAlive = true;
}


/**
 * plays specific sound
 */
function playSound(audioFile) {
    audioFile.play();
}


/**
 * stops specific sound
 */
function stopSound(audioFile) {
    audioFile.pause();
}


/**
 * stops all running audio
 */
function stopAllSounds() {
    allAudioFiles.forEach((audio) => {
        audio.pause();
    });
}


/**
 * mutes all running audio
 */
function muteSound() {
    sound = false;
    allAudioFiles.forEach(function (audio) {
        audio.muted = true;
    });
}


/**
 * turns every running audio on
 */
function unmuteSound() {
    sound = true;
    allAudioFiles.forEach(function (audio) {
        audio.muted = false;
    });
}


/**
 * adds a container on top of the game to show collected coins
 */
function addCoinsCountContainer() {
    let content = document.getElementById('overlayContainer');
    content.innerHTML += `
    <div class="overlay-container">
        <div class="coins-count-container" id="coinsCountContainer"></div>
    <div>
    `;
}


/**
 * shows the collected coins
 */
function addCoins(cnt) {
    if (inGame) {
        let coinsContainer = document.getElementById('coinsCountContainer');
        coinsContainer.innerHTML = `
        <img src="../img/status/coins/coin.png" class="coin-counter-img">
        <h5 class="coins w-120">${cnt}</h5>
        `;
    }
}


/**
* pauses game and shows pause screen or continues game and hides pause screen
*/
function pauseRunningGame() {
    if (!pauseGame) {
        pauseGame = true;
        showPauseScreen();
        return;
    }
    if (pauseGame) {
        pauseGame = false;
        continueGame();
        deletePauseScreen();
    }
}


/**
 * continues the game world drawing after pause
 */
function continueGame() {
    world.draw();
}


/**
 * shows the pause screen, highlights current settings
 */
function showPauseScreen() {
    let pauseScreen = document.getElementById('pauseScreen');
    pauseScreen.classList.remove('d-none');
    pauseScreen.innerHTML = getPauseScreenHTML();
    checkExistingSettings();
}


/**
 * deletes pause screen and end screen
 */
function deletePauseScreen() {
    let pauseScreen = document.getElementById('pauseScreen');
    pauseScreen.innerHTML = '';
    pauseScreen.classList.add('d-none');
    let endScreen = document.getElementById('endScreen');
    endScreen.classList.add('d-none');
}


/**
 * handles the game over conditions, shows endscreen after animations
 */
function gameOver() {
    inGame = false;
    characterAlive = false;
    gameWon = false;
    clearAllIntervals();
    stopAllSounds();
    GAMEOVER_SOUND.play();
    world.character.deadAnimation();
    setTimeout(showEndScreen, 2500);
}


/**
* handles the game won conditions, shows endscreen after animations
*/
function gameFinished() {
    inGame = false;
    killedEndbossCounter++;
    gameWon = true;
    clearAllIntervals();
    stopAllSounds();
    world.level.endboss[0].deadAnimation();
    setTimeout(showEndScreen, 2000);
}


/**
 * shows end screen after checking for win or lose, shows points
 */
function showEndScreen() {
    let headline;
    let src;
    if (!gameWon) {
        headline = '¡ You lose !';
        src = '../img/endscreens/losing_screen.png';
    } else {
        headline = '¡ You win !';
        src = '../img/endscreens/winning_screen.png';
    }
    let endScreen = document.getElementById('endScreen');
    endScreen.classList.remove('d-none');
    endScreen.style = `background-image: url(${src});`;
    endScreen.innerHTML = getEndscreenHTML(headline);
    showScoredPoints();
}


/**
 * restarts game
 */
function playAgain() {
    returnToStartpage();
    startGame();
}


/**
 * shows game in fullscreen
 */
function openFullscreen() {
    fullscreen = true;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


/**
 * removes game from fullscreen
 */
function closeFullscreen() {
    fullscreen = false;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


/**
 * checks all scored points and gets the associated containers
 */
function showScoredPoints() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((valueDisplay) => {
        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute('data-target'));
        if (endValue == 0) {
            valueDisplay.textContent = startValue;
        } else {
            showPointsAnimation(valueDisplay, startValue, endValue);
        }
    });
}


/**
 * shows a counting up animation for all scored points
 */
function showPointsAnimation(valueDisplay, startValue, endValue) {
    let duration = Math.floor(1000 / endValue);
    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
}