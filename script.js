function initialize() {
    showStartpage();
    pushAudios();
}

function startGame() {
    stopSound(MENU_SOUND);
    document.getElementById('content').innerHTML = `
    <canvas id="canvas" width="1920px" height="1080px"></canvas>
    `;
    initWorld();
}

function showSettings() {
    playSound(MENU_SOUND);
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    startscreen.innerHTML = getSettingsHTML();
}

function getSettingsHTML() {
    return `
    <div class="selection-text-container">
        <span id="selectedOption" class="d-none">Hier könnte ihre Werbung stehen</span>
    </div>
    <div class="sound-container">
        <h4>Fullscreen</h4>
        <div class="fullscreen-circle-btn yellow-highlight" id="fullscreenIcon1" onclick="highlightFullscreenSelection(1); showSelectedOption('Off')">
            <img src="../img/icons/fullscreen_off.png" id="fullscreenOff" class="fullscreen-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="fullscreen-circle-btn" id="fullscreenIcon2" onclick="highlightFullscreenSelection(2); showSelectedOption('On')">
            <img src="../img/icons/fullscreen_on.png" id="fullscreenOn" class="fullscreen-icon" onclick="playSound(CLICK_SOUND)">
        </div>
    </div>
    <div class="sound-container">
        <h4>Sound</h4>
        <div class="sound-circle-btn yellow-highlight" id="soundIcon1" onclick="highlightSoundSelection(1); showSelectedOption('Enabled')">
            <img src="../img/icons/sound_on.png" id="unmuteButton" class="setting-icon" onclick="playSound(CLICK_SOUND); unmuteSound()">
        </div>
        <div class="sound-circle-btn" id="soundIcon2" onclick="highlightSoundSelection(2); showSelectedOption('Muted')">
            <img src="../img/icons/sound_mute.png" id="muteButton" class="setting-icon" onclick="playSound(CLICK_SOUND); muteSound()">
        </div>
    </div>
    <div class="difficulty-container">
        <h4>Difficulty</h4>
        <div class="difficulty-circle-btn yellow-highlight" id="difficultyIcon1" onclick="highlightDifficultySelection(1); showSelectedOption('Easy Peasy')">
            <img src="../img/icons/carp.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon2" onclick="highlightDifficultySelection(2); showSelectedOption('Medium')">
            <img src="../img/icons/frogfish.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon3" onclick="highlightDifficultySelection(3); showSelectedOption('Hard')">
            <img src="../img/icons/dolphin.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon4" onclick="highlightDifficultySelection(4); showSelectedOption('Extremly Hard')">
            <img src="../img/icons/shark.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
    </div>
    <div class="back-btn">
        <img src="../img/icons/home.png" class="home-icon" onclick="playSound(CLICK_SOUND); showStartpage()">
    </div>
    `;
}

function highlightDifficultySelection(cnt) {
    let difficultyIcons = document.getElementsByClassName('difficulty-circle-btn');
    let clickedIcon = document.getElementById(`difficultyIcon${cnt}`);
    for (let i = 0; i < difficultyIcons.length; i++) {
        icon = difficultyIcons[i];
        removeHighlight(icon);
    }
    clickedIcon.classList.add('yellow-highlight');
}

function highlightSoundSelection(cnt) {
    let soundIcons = document.getElementsByClassName('sound-circle-btn');
    let clickedIcon = document.getElementById(`soundIcon${cnt}`);
    for (let i = 0; i < soundIcons.length; i++) {
        icon = soundIcons[i];
        removeHighlight(icon);
    }
    clickedIcon.classList.add('yellow-highlight');
}

function highlightFullscreenSelection(cnt) {
    let fullscreenIcons = document.getElementsByClassName('fullscreen-circle-btn');
    let clickedIcon = document.getElementById(`fullscreenIcon${cnt}`);
    for (let i = 0; i < fullscreenIcons.length; i++) {
        icon = fullscreenIcons[i];
        removeHighlight(icon);
    }
    clickedIcon.classList.add('yellow-highlight');
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
    let selectedOption = document.getElementById('selectedOption');
    selectedOption.classList.add('d-none');
}

function showStartpage() {
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
    let content = document.getElementById('content');
    content.innerHTML = `
    <div class="startscreen" id="startscreen"></div>
    `;
    stopAllSounds();
    deletePauseScreen();
    showStartpage();
    playSound(MENU_SOUND);
}

function getStartpageHMTL() {
    return `
    <h1>Skarkyboy</h1>
    <div class="start-button" onclick="playSound(START_SOUND); startGame()">
        <h2>Start</h2>
    </div>
    <div class="settings-button" onclick="playSound(CLICK_SOUND); showSettings()">
        <h3>Settings</h3>
    </div>
    <div class="navigation-button" onclick="playSound(CLICK_SOUND); showNavigation()">
        <h3>Navigation</h3>
    </div>
    `;
}

function showNavigation() {
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    startscreen.innerHTML = getNavigationHTML();
}

function getNavigationHTML() {
    return `
    <img src="../img/description/Instructions 2.png" class="instructions">
    <div class="back-btn">
        <img src="../img/icons/home.png" class="home-icon" onclick="playSound(CLICK_SOUND); showStartpage()">
    </div>
    `;
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
    let content = document.getElementById('content');
    content.innerHTML += `
    <div class="coins-count-container" id="coinsCountContainer">
    </div>
    `;
}

function addCoins(cnt) {
    let coinsContainer = document.getElementById('coinsCountContainer');
    coinsContainer.innerHTML = `
    <h5>${cnt}</h5>
    `;
}

function showPauseScreen() {
    let pauseScreen = document.getElementById('pauseScreen');
    pauseScreen.classList.remove('d-none');
}

function deletePauseScreen() {
    let pauseScreen = document.getElementById('pauseScreen');
    pauseScreen.classList.add('d-none');
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
        src = '../img/description/losing_screen.png';
    } else {
        headline = '¡ You win !';
        src = '../img/description/winning_screen.png';
    }
    let endScreen = document.getElementById('endScreen');
    endScreen.classList.remove('d-none');
    endScreen.style = `background-image: url(${src});`;
    endScreen.innerHTML = getEndscreenHTML(headline);
}

function getEndscreenHTML(hl) {
    return `
        <h6 id="endscreenHeadline" class="mt-140">${hl}</h6>
        <div class="resume-container">
            <div class="resume-box">
                <img src="../img/status/coins/coin.png" class="coin-img">
                <h5 class="d-flex-centered">${world.coinsCount}</h5>
            </div>
            <div class="resume-box">
                <img src="../img/enemies/puffer_fish_red/dead/(1).png" class="pufferfish-img">
                <h5 class="d-flex-centered">${killedPufferFishCounter}</h5>
            </div>
        </div>
        <div class="sound-container end-screen-container-adjustment">
            <h4 class="fs-70 w-750">Go again</h4>
            <div class="w-344 d-flex center">
                <div class="back-btn pos-unset back-btn-adjustment">
                    <img src="../img/icons/restart.png" class="restart-icon" onclick="playAgain()">
                </div>
            </div>
        </div>
        <div class="sound-container end-screen-container-adjustment">
            <h4 class="fs-70 w-750">Return to Startscreen</h4>
            <div class="w-344 d-flex center">
                <div class="back-btn pos-unset back-btn-adjustment">
                    <img src="../img/icons/home.png" class="home-icon home-icon-adjustment" onclick="playSoundAndReturn()">
                </div>
            </div>
        </div>
    `;
}

function playAgain(){
    let endScreen = document.getElementById('endScreen');
    endScreen.classList.add('d-none');
    document.getElementById('content').innerHTML = '';
    startGame();
}