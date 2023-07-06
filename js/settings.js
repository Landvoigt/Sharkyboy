/**
 * shows the settings page
 */
function showSettings() {
    onSettingsPage = true;
    playSound(MENU_SOUND);
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('change-display');
    startscreen.innerHTML = getSettingsHTML();
    checkExistingSettings();
    checkExistingDifficulty();
}


/**
 * highlightes selected options icon
 */
function highlightSelectedOption(id) {
    let clickedIcon = document.getElementById(`${id}`);
    clickedIcon.classList.add('yellow-highlight');
}


/**
 * gets all icons of current setting
 */
function removeHighlights(type) {
    let icons = document.getElementsByClassName(`${type}-circle-btn`);
    for (let i = 0; i < icons.length; i++) {
        let icon = icons[i];
        removeHighlight(icon);
    }
}


/**
 * saves current fullscreen setting
 */
function saveHighlightFullScreen(cnt) {
    highlightCache.fullscreen = cnt;
}


/**
 * saves current sound setting
 */
function saveHighlightSound(cnt) {
    highlightCache.sound = cnt;
}


/**
 * saves current difficulty setting
 */
function saveHighlightDifficulty(cnt) {
    highlightCache.difficulty = cnt;
}


/**
 * removes highlight 
 */
function removeHighlight(element) {
    element.classList.remove('yellow-highlight');
}


/**
 * checks for already given fullscreen and sound settings and adds highlight
 */
function checkExistingSettings() {
    removeHighlights('fullscreen');
    removeHighlights('sound');
    document.getElementById(`fullscreenIcon${highlightCache.fullscreen}`).classList.add('yellow-highlight');
    document.getElementById(`soundIcon${highlightCache.sound}`).classList.add('yellow-highlight');
}


/**
 * checks for already given difficulty and adds highlight
 */
function checkExistingDifficulty() {
    removeHighlights('difficulty');
    document.getElementById(`difficultyIcon${highlightCache.difficulty}`).classList.add('yellow-highlight');
}


/**
 * shows small text field with selected setting, removes after timeout
 */
function showSelectedOption(text) {
    let selectedOption = document.getElementById('selectedOption');
    selectedOption.innerHTML = `${text}`;
    selectedOption.classList.remove('d-none');
    setTimeout(hideSelectedOption, 1250);
}


/**
 * hides text field
 */
function hideSelectedOption() {
    if (onSettingsPage) {
        let selectedOption = document.getElementById('selectedOption');
        selectedOption.classList.add('d-none');
    }
}