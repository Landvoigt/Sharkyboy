function initialize() {
    showStartpage();
    pushAudios();
}


function startGame() {
    let startscreen = document.getElementById('startscreen');
    checkDevice(startscreen);
    setTimeout(createCanvas, 2500);
}


function createCanvas() {
    document.getElementById('content').innerHTML = getContentHTML();
    initWorld();
    bindMobileBtnEvents();
    stopSound(MENU_SOUND);
    playSound(START_SOUND);
}


window.onload = function () {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        loadMobileKeys();
    }
};


function loadMobileKeys() {
    let movement = document.getElementById('mobileMovement');
    let attack = document.getElementById('mobileAttack');
    let pause = document.getElementById('mobilePause');
    movement.style = 'display: flex';
    attack.style = 'display: flex';
    pause.style = 'display: flex';
}


function countUpNumbers() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((valueDisplay) => {
        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute('data-target'));
        let duration = Math.floor(1000 / endValue);
        if (endValue == 0) {
            valueDisplay.textContent = startValue;
        } else {
            let counter = setInterval(function () {
                startValue += 1;
                valueDisplay.textContent = startValue;
                if (startValue == endValue) {
                    clearInterval(counter);
                }
            }, duration);
        }
    });
}


function showSettings() {
    onSettingsPage = true;
    playSound(MENU_SOUND);
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    startscreen.innerHTML = getSettingsHTML();
    checkExistingSettings();
    checkExistingDifficulty();
}


function highlightDifficultySelection(cnt) {
    removeDifficultySelectionHighlights();
    let clickedIcon = document.getElementById(`difficultyIcon${cnt}`);
    clickedIcon.classList.add('yellow-highlight');
    highlightCache.difficulty = cnt;
}


function removeDifficultySelectionHighlights() {
    let difficultyIcons = document.getElementsByClassName('difficulty-circle-btn');
    for (let i = 0; i < difficultyIcons.length; i++) {
        icon = difficultyIcons[i];
        removeHighlight(icon);
    }
}


function highlightSoundSelection(cnt) {
    removeSoundSelectionHighlights();
    let clickedIcon = document.getElementById(`soundIcon${cnt}`);
    clickedIcon.classList.add('yellow-highlight');
    highlightCache.sound = cnt;
}


function removeSoundSelectionHighlights() {
    let soundIcons = document.getElementsByClassName('sound-circle-btn');
    for (let i = 0; i < soundIcons.length; i++) {
        icon = soundIcons[i];
        removeHighlight(icon);
    }
}


function highlightFullscreenSelection(cnt) {
    removeFullscreenSelectionHighlights();
    let clickedIcon = document.getElementById(`fullscreenIcon${cnt}`);
    clickedIcon.classList.add('yellow-highlight');
    highlightCache.fullscreen = cnt;
}


function removeFullscreenSelectionHighlights() {
    let fullscreenIcons = document.getElementsByClassName('fullscreen-circle-btn');
    for (let i = 0; i < fullscreenIcons.length; i++) {
        icon = fullscreenIcons[i];
        removeHighlight(icon);
    }
}


function removeHighlight(element) {
    element.classList.remove('yellow-highlight');
}


function showSelectedOption(text) {
    let selectedOption = document.getElementById('selectedOption');
    selectedOption.innerHTML = `${text}`;
    selectedOption.classList.remove('d-none');
    setTimeout(hideSelectedOption, 1250);
}


function hideSelectedOption() {
    if (onSettingsPage) {
        let selectedOption = document.getElementById('selectedOption');
        selectedOption.classList.add('d-none');
    }
}


function checkExistingSettings() {
    removeFullscreenSelectionHighlights();
    removeSoundSelectionHighlights();
    document.getElementById(`fullscreenIcon${highlightCache.fullscreen}`).classList.add('yellow-highlight');
    document.getElementById(`soundIcon${highlightCache.sound}`).classList.add('yellow-highlight');
}


function checkExistingDifficulty() {
    removeDifficultySelectionHighlights();
    document.getElementById(`difficultyIcon${highlightCache.difficulty}`).classList.add('yellow-highlight');
}


function showStartpage() {
    onSettingsPage = false;
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.remove('change-display');
    startscreen.innerHTML = getStartpageHMTL();
}


function playSoundAndReturn() {
    playSound(CLICK_SOUND);
    setTimeout(returnToStartpage, 100);
}


function playSoundAndContinue() {
    playSound(CLICK_SOUND);
    setTimeout(continueGame, 100);
}


function returnToStartpage() {
    deletePauseScreen();
    stopAllSounds();
    inGame = false;
    pauseGame = false;
    characterAlive = true;
    endbossReached = false;
    collectedPoison = 0;
    killedPufferFishCounter = 0;
    killedEndbossCounter = 0;
    gameWon = '';
    world.level.endboss[0].endbossAlive = true;
    changeDifficulty(difficulty);
    document.getElementById('content').innerHTML = `
    <div class="startscreen" id="startscreen"></div>
    `;
    showStartpage();
    playSound(MENU_SOUND);
}


function showNavigation() {
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    checkDevice(startscreen);
    startscreen.innerHTML += getHomeButtonHTML();
}


function checkDevice(startscreen) {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        startscreen.innerHTML = getNavigationHTMLMobile();
    } else {
        startscreen.innerHTML = getNavigationHTMLDesktop();
    }
}


function playSound(audioFile) {
    audioFile.play();
}


function stopSound(audioFile) {
    audioFile.pause();
}


function stopAllSounds() {
    allAudioFiles.forEach((audio) => {
        audio.pause();
    });
}


function muteSound() {
    sound = false;
    allAudioFiles.forEach(function (audio) {
        audio.muted = true;
    });
}


function unmuteSound() {
    sound = true;
    allAudioFiles.forEach(function (audio) {
        audio.muted = false;
    });
}


function addCoinsCountContainer() {
    let content = document.getElementById('overlayContainer');
    content.innerHTML += `
    <div class="overlay-container">
        <div class="coins-count-container" id="coinsCountContainer"></div>
    `;
}


function addCoins(cnt) {
    if (inGame) {
        let coinsContainer = document.getElementById('coinsCountContainer');
        coinsContainer.innerHTML = `
        <img src="../img/status/coins/coin.png" class="coin-counter-img">
        <h5 class="coins w-120">${cnt}</h5>
        `;
    }
}


function showPauseScreen() {
    let pauseScreen = document.getElementById('pauseScreen');
    pauseScreen.classList.remove('d-none');
    pauseScreen.innerHTML = getPauseScreenHTML();
    checkExistingSettings();
}


function deletePauseScreen() {
    let pauseScreen = document.getElementById('pauseScreen');
    pauseScreen.innerHTML = '';
    pauseScreen.classList.add('d-none');
    let endScreen = document.getElementById('endScreen');
    endScreen.classList.add('d-none');
}


function showWinScreen() {
    world.pauseGame();
    deletePauseScreen();
    let winScreen = document.getElementById('winScreen');
    winScreen.classList.remove('d-none');
}


function continueGame() {
    world.pauseGame();
}


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
    countUpNumbers();
}


function playAgain() {
    returnToStartpage();
    startGame();
}


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