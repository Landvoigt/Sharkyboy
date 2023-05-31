function startGame() {
    document.getElementById('content').innerHTML = `
    <canvas id="canvas" width="1920px" height="1080px"></canvas>
    `;
    initWorld();
}


function showSettings() {
    pushAudios();
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    startscreen.innerHTML = `
    <div class="sound-container">
        <div class="settings-text">
            <span>Sound</span>
        </div>
        <div class="setting-circle-btn">
            <img src="../img/sound_mute.png" id="muteButton" class="setting-icon" onclick="muteSound(); playSound(CLICK_SOUND)">
        </div>
        <div class="setting-circle-btn">
            <img src="../img/sound_on.png" id="unmuteButton" class="setting-icon" onclick="unmuteSound(); playSound(CLICK_SOUND)">
        </div>
    </div>
    <div class="difficulty-container">
        <div class="settings-text">
            <span>Difficulty</span>
        </div>
        <div class="setting-circle-btn">
            <img src="../img/description/fisch (1).png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="setting-circle-btn">
            <img src="../img/description/fisch.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="setting-circle-btn">
            <img src="../img/description/delfin.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="setting-circle-btn">
            <img src="../img/description/hai.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
    </div>
    <div class="back-btn">
        <img src="../img/go-back.png" class="back-icon" onclick="showStartpage(); playSound(CLICK_SOUND)">
    </div>
    `;
}

function showStartpage() {
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.remove('change-display');
    startscreen.innerHTML = `
    <div class="menu">
        <div class="settings-button" onclick="showSettings(); playSound(CLICK_SOUND)">
            <h3>Settings</h3>
        </div>
        <div class="start-button" onclick="startGame(); playSound(START_SOUND)">
            <h2>Start</h2>
        </div>
        <div class="navigation-button" onclick="showNavigation(); playSound(CLICK_SOUND)">
            <h3>Navigation</h3>
        </div>
    </div>
    `;
}

function showNavigation() {

}

function playSound(audioFile) {
    audioFile.play();
}

function muteSound() {
    sound = false;
    soundsArray.forEach(function (audio) {
        audio.muted = true;
    });
}

function unmuteSound() {
    sound = true;
    soundsArray.forEach(function (audio) {
        audio.muted = false;
    });
}