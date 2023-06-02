function initialize(){
    showStartpage();
    pushAudios();
}


function startGame() {
    document.getElementById('content').innerHTML = `
    <canvas id="canvas" width="1920px" height="1080px"></canvas>
    `;
    initWorld();
}


function showSettings() {
    playSound(MENU_SOUND);
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    startscreen.innerHTML = `
    <div class="selection-text-container">
        <span id="selectedOption" class="d-none">Hier könnte ihre Werbung stehen</span>
    </div>
    <div class="sound-container">
        <h4>Sound</h4>
        <div class="sound-circle-btn" id="soundIcon1" onclick="highlightSoundSelection(1); showSelectedOption('Muted')">
            <img src="../img/icons/sound_mute.png" id="muteButton" class="setting-icon" onclick="playSound(CLICK_SOUND); muteSound()">
        </div>
        <div class="sound-circle-btn" id="soundIcon2" onclick="highlightSoundSelection(2); showSelectedOption('Enabled')">
            <img src="../img/icons/sound_on.png" id="unmuteButton" class="setting-icon" onclick="playSound(CLICK_SOUND); unmuteSound()">
        </div>
    </div>
    <div class="difficulty-container">
        <h4>Difficulty</h4>
        <div class="difficulty-circle-btn" id="difficultyIcon1" onclick="highlightDifficultySelection(1); showSelectedOption('Easy Peasy')">
            <img src="../img/description/fisch (1).png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon2" onclick="highlightDifficultySelection(2); showSelectedOption('Medium')">
            <img src="../img/description/fisch.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon3" onclick="highlightDifficultySelection(3); showSelectedOption('Hardmode')">
            <img src="../img/description/delfin.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
        <div class="difficulty-circle-btn" id="difficultyIcon4" onclick="highlightDifficultySelection(4); showSelectedOption('Armageddon')">
            <img src="../img/description/hai.png" class="difficulty-icon" onclick="playSound(CLICK_SOUND)">
        </div>
    </div>
    <div class="back-btn">
        <img src="../img/icons/go-back.png" class="back-icon" onclick="playSound(CLICK_SOUND); showStartpage()">
    </div>
    `;
}

function highlightDifficultySelection(cnt) {
    let difficultyIcons = document.getElementsByClassName('difficulty-circle-btn');
    let clickedIcon = document.getElementById(`difficultyIcon${cnt}`);
    for (let i = 0; i < difficultyIcons.length; i++) {
        icon = difficultyIcons[i];
        icon.classList.remove('yellow-highlight');
    }
    clickedIcon.classList.add('yellow-highlight');
}

function highlightSoundSelection(cnt) {
    let soundIcons = document.getElementsByClassName('sound-circle-btn');
    let clickedIcon = document.getElementById(`soundIcon${cnt}`);
    for (let i = 0; i < soundIcons.length; i++) {
        icon = soundIcons[i];
        icon.classList.remove('yellow-highlight');
    }
    clickedIcon.classList.add('yellow-highlight');
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
    startscreen.innerHTML = `
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

}

function playSound(audioFile) {
    audioFile.play();
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