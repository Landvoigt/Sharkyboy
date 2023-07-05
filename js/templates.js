function getStartpageHMTL() {
    return `
    <h1>Skarkyboy</h1>
    <div class="startscreen-btn-box">
        <div class="start-button" onclick="startGame()">
            <h2>Start</h2>
        </div>
        <div class="settings-button" onclick="playSound(CLICK_SOUND); showSettings()">
            <h3>Settings</h3>
        </div>
        <div class="navigation-button" onclick="playSound(CLICK_SOUND); showNavigation()">
            <h3>Navigation</h3>
        </div>
    </div>
    `;
}


function getSettingsHTML() {
    return `
    <div class="selection-text-container">
        <span id="selectedOption" class="d-none">Hier könnte ihre Werbung stehen</span>
    </div>
    <div class="sound-container">
        <h4>Fullscreen</h4>
        <div class="fullscreen-circle-btn yellow-highlight" id="fullscreenIcon1" onclick="playSound(CLICK_SOUND); closeFullscreen(); showSelectedOption('Off'); highlightFullscreenSelection(1)">
            <img src="../img/icons/fullscreen_off.png" id="fullscreenOff" class="fullscreen-icon">
        </div>
        <div class="fullscreen-circle-btn" id="fullscreenIcon2" onclick="playSound(CLICK_SOUND); openFullscreen(); showSelectedOption('On'); highlightFullscreenSelection(2)">
            <img src="../img/icons/fullscreen_on.png" id="fullscreenOn" class="fullscreen-icon">
        </div>
    </div>
    <div class="sound-container">
        <h4>Sound</h4>
        <div class="sound-circle-btn yellow-highlight" id="soundIcon1" onclick="playSound(CLICK_SOUND); unmuteSound(); showSelectedOption('Enabled'); highlightSoundSelection(1)">
            <img src="../img/icons/sound_on.png" id="unmuteButton" class="setting-icon">
        </div>
        <div class="sound-circle-btn" id="soundIcon2" onclick="playSound(CLICK_SOUND); muteSound(); showSelectedOption('Muted'); highlightSoundSelection(2)">
            <img src="../img/icons/sound_mute.png" id="muteButton" class="setting-icon">
        </div>
    </div>
    <div class="difficulty-container">
        <h4>Difficulty</h4>
        <div class="difficulty-circle-btn" id="difficultyIcon1" onclick="playSound(CLICK_SOUND); changeDifficulty(1); showSelectedOption('Easy Peasy'); highlightDifficultySelection(1)">
            <img src="../img/icons/carp.png" class="difficulty-icon">
        </div>
        <div class="difficulty-circle-btn yellow-highlight" id="difficultyIcon2" onclick="playSound(CLICK_SOUND); changeDifficulty(2); showSelectedOption('Medium'); highlightDifficultySelection(2)">
            <img src="../img/icons/frogfish.png" class="difficulty-icon">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon3" onclick="playSound(CLICK_SOUND); changeDifficulty(3); showSelectedOption('Hard'); highlightDifficultySelection(3)">
            <img src="../img/icons/dolphin.png" class="difficulty-icon">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon4" onclick="playSound(CLICK_SOUND); changeDifficulty(4); showSelectedOption('Extremly Hard'); highlightDifficultySelection(4)">
            <img src="../img/icons/shark.png" class="difficulty-icon">
        </div>
    </div>
    <div class="back-btn" onclick="playSound(CLICK_SOUND); showStartpage()">
        <img src="../img/icons/home.png" class="home-icon">
    </div>
    `;
}


function getNavigationHTMLDesktop() {
    return `
    <div class="navigation-bg">
        <div class="navigation-row navigation-row-adjustment">
            <h5 class="navigation-text">move shark</h5>
            <div class="keybindings-movement">
                <div>
                    <div class="keybindings-container w-75">
                        <p>W</p>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="keybindings-container w-75">
                        <p>A</p>
                    </div>
                    <div class="keybindings-container w-75">
                        <p>S</p>
                    </div>
                    <div class="keybindings-container w-75">
                        <p>D</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation-row">
            <h5 class="navigation-text">fin slap</h5>
            <div class="keybindings-section">
                <div class="keybindings-container keybindings-cont-mobile">
                    <p>Hold SPACE</p>
                </div>
            </div>
        </div>
        <div class="navigation-row">
            <h5 class="navigation-text">poison bubble</h5>
            <div class="keybindings-section">
                <div class="keybindings-container keybindings-cont-mobile">
                    <p>Hold CTRL</p>
                </div>
            </div>
        </div>
        <div class="navigation-row">
            <h5 class="navigation-text">pause game</h5>
            <div class="keybindings-section">
                <div class="keybindings-container keybindings-cont-mobile">
                    <p>TAB</p>
                </div>
            </div>
        </div>
    </div>
    `;
}


function getNavigationHTMLMobile() {
    return `
    <div class="navigation-bg">
        <div class="navigation-row navigation-row-adjustment">
            <h5 class="navigation-text">move shark</h5>
            <div class="keybindings-movement">
                <div>
                    <div id="btnUp" class="mobile-movement-box">
                        <img src="../img/icons/arrow.png" class="arrow up">
                    </div>
                </div>
                <div class="arrows-box-adjustment">
                    <div id="btnLeft" class="mobile-movement-box">
                        <img src="../img/icons/arrow.png" class="arrow left">
                    </div>
                    <div id="btnDown" class="mobile-movement-box mb-25">
                        <img src="../img/icons/arrow.png" class="arrow down">
                    </div>
                    <div id="btnRight" class="mobile-movement-box">
                        <img src="../img/icons/arrow.png" class="arrow right">
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation-row">
            <h5 class="navigation-text">fin slap</h5>
            <div class="keybindings-section">
                <div class="keybindings-container keybindings-cont-mobile">
                    <p>Hold Attack</p>
                </div>
            </div>
        </div>
        <div class="navigation-row">
            <h5 class="navigation-text">poison bubble</h5>
            <div class="keybindings-section">
                <div class="keybindings-container keybindings-cont-mobile">
                    <p>Hold Bubble</p>
                </div>
            </div>
        </div>
        <div class="navigation-row">
            <h5 class="navigation-text">pause game</h5>
            <div class="keybindings-section">
                <div class="keybindings-container keybindings-cont-mobile">
                    <p>Pause</p>
                </div>
            </div>
        </div>
    </div>
    `;
}


function getContentHTML() {
    return `
    <div style="height: 100%; width:100%; background-color: #000000;">
        <canvas id="canvas" width="1920px" height="1080px"></canvas>
        <div id="overlayContainer" class="overlay-div">
            <div id="mobileMovement" class="mobile-movement-container">
                <div>
                    <div id="btnUp" class="mobile-movement-box">
                        <img src="../img/icons/arrow.png" class="arrow up">
                    </div>
                </div>
                <div class="arrows-box-adjustment">
                    <div id="btnLeft" class="mobile-movement-box">
                        <img src="../img/icons/arrow.png" class="arrow left">
                    </div>
                    <div id="btnDown" class="mobile-movement-box mb-25">
                        <img src="../img/icons/arrow.png" class="arrow down">
                    </div>
                    <div id="btnRight" class="mobile-movement-box">
                        <img src="../img/icons/arrow.png" class="arrow right">
                    </div>
                </div>
            </div>
            <div id="mobileAttack" class="mobile-attack-container">
                <div id="btnAttack" class="mobile-attack-box w-70">
                    <p>Attack</p>
                </div>
                <div id="btnBubble" class="mobile-attack-box w-70">
                    <p>Bubble</p>
                </div>
            </div>
            <div id="mobilePause" class="mobile-pause-container">
                <div id="btnPause" class="mobile-pause-box w-70">
                    <p>Pause</p>
                </div>
            </div>
        </div>
    </div>
    `;
}


function getHomeButtonHTML() {
    return `
    <div class="back-btn" onclick="playSound(CLICK_SOUND); showStartpage()">
        <img src="../img/icons/home.png" class="home-icon">
    </div>
    `;
}


function getPauseScreenHTML() {
    return `
    <div class="sound-container center">
        <h4 class="w-690">Fullscreen</h4>
        <div class="fullscreen-circle-btn yellow-highlight" id="fullscreenIcon1"
            onclick="playSound(CLICK_SOUND); closeFullscreen(); highlightFullscreenSelection(1)">
            <img src="../img/icons/fullscreen_off.png" id="fullscreenOff" class="fullscreen-icon">
        </div>
        <div class="fullscreen-circle-btn" id="fullscreenIcon2"
            onclick="playSound(CLICK_SOUND); openFullscreen(); highlightFullscreenSelection(2)">
            <img src="../img/icons/fullscreen_on.png" id="fullscreenOn" class="fullscreen-icon">
        </div>
    </div>
    <div class="sound-container center">
        <h4 class="w-690">Sound</h4>
        <div class="sound-circle-btn yellow-highlight" id="soundIcon1"
            onclick="playSound(CLICK_SOUND); unmuteSound(); highlightSoundSelection(1)">
            <img src="../img/icons/sound_on.png" id="unmuteButton" class="setting-icon">
        </div>
        <div class="sound-circle-btn" id="soundIcon2"
            onclick="playSound(CLICK_SOUND); muteSound(); highlightSoundSelection(2)">
            <img src="../img/icons/sound_mute.png" id="muteButton" class="setting-icon">
        </div>
    </div>
    <div class="sound-container back-btn-container-adjustment mt-50">
        <h4 class="fs-4 w-690">Return to Game</h4>
        <div class="w-344 d-flex center">
            <div class="back-btn pos-unset back-btn-adjustment" onclick="playSoundAndContinue()">
                <img src="../img/icons/go_back.png" class="back-icon">
            </div>
        </div>
    </div>
    <div class="sound-container back-btn-container-adjustment">
        <h4 class="fs-4 w-690">Return to Startscreen</h4>
        <div class="w-344 d-flex center">
            <div class="back-btn pos-unset back-btn-adjustment" onclick="playSoundAndReturn()">
                <img src="../img/icons/home.png" class="home-icon home-icon-adjustment">
            </div>
        </div>
    </div>
    `;
}


function getEndscreenHTML(hl) {
    return `
        <h6 id="endscreenHeadline" class="mt-140">${hl}</h6>
        <div class="resume-container">
            <div class="resume-box">
                <img src="../img/status/coins/coin.png" class="coin-img">
                <h5 class="d-flex-centered counter" data-target="${world.coinsCount}"></h5>
            </div>
            <div class="resume-box">
                <img src="../img/enemies/puffer_fish_red/dead/(1).png" class="pufferfish-img">
                <h5 class="d-flex-centered counter" data-target="${killedPufferFishCounter}"></h5>
            </div>
            <div class="resume-box">
                <img src="../img/enemies/killerwhale/dead/(5).png" class="killerwhale-img">
                <h5 class="d-flex-centered counter" data-target="${killedEndbossCounter}"></h5>
            </div>
        </div>
        <div class="sound-container end-screen-container-adjustment">
            <h4 class="fs-4 w-690">Go again</h4>
            <div class="w-344 d-flex center">
                <div class="back-btn pos-unset back-btn-adjustment" onclick="playAgain()">
                    <img src="../img/icons/restart.png" class="restart-icon">
                </div>
            </div>
        </div>
        <div class="sound-container end-screen-container-adjustment">
            <h4 class="fs-4 w-690">Return to Startscreen</h4>
            <div class="w-344 d-flex center">
                <div class="back-btn pos-unset back-btn-adjustment" onclick="playSoundAndReturn()">
                    <img src="../img/icons/home.png" class="home-icon home-icon-adjustment">
                </div>
            </div>
        </div>
    `;
}