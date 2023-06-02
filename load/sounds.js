const MENU_SOUND = new Audio('../sounds/menu_sound.mp3');
const GAME_MUSIC = new Audio('../sounds/ambient_background_music.mp3');
const ENDGAME_MUSIC = new Audio('../sounds/battle_music.mp3');
const SWIMMING_SOUND = new Audio('../sounds/sharky_swim.mp3');
const HURT_SOUND = new Audio('../sounds/hurt.mp3');
const SLAP_SOUND = new Audio('../sounds/sharky_slap.mp3');
const GAMEOVER_SOUND = new Audio('../sounds/game_over.mp3');
const CLICK_SOUND = new Audio('../sounds/click.mp3');
const START_SOUND = new Audio('../sounds/start_game.mp3');

let allAudioFiles = [];

function pushAudios() {
    allAudioFiles.push(MENU_SOUND);
    allAudioFiles.push(GAME_MUSIC);
    allAudioFiles.push(ENDGAME_MUSIC);
    allAudioFiles.push(SWIMMING_SOUND);
    allAudioFiles.push(HURT_SOUND);
    allAudioFiles.push(SLAP_SOUND);
    allAudioFiles.push(GAMEOVER_SOUND);
    allAudioFiles.push(CLICK_SOUND);
    allAudioFiles.push(START_SOUND);
}