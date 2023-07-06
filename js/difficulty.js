let currentDifficulty = 2;
let endbossHealthPoints = 250;
let characterHitFromCasualEnemy = 10;
let characterHitFromEndboss = 25;
let casualEnemyMinSpeed = 0.2;
let casualEnemyMaxSpeed = 0.6;


/**
 * changes the game difficulty in 4 levels 
 */
function changeDifficulty(dfc) {
    currentDifficulty = dfc;
    if (dfc == 1) {
        setEasyDifficulty();
    }
    if (dfc == 2) {
        setStandardDifficulty();
    }
    if (dfc == 3) {
        setHardDifficulty();
    }
    if (dfc == 4) {
        setExtremHardDifficulty();
    }
}


/**
 * sets the difficulty parameters to easy
 */
function setEasyDifficulty() {
    endbossHealthPoints = 150;
    characterHitFromCasualEnemy = 5;
    characterHitFromEndboss = 15;
    casualEnemyMinSpeed = 0.15;
    casualEnemyMaxSpeed = 0.4;
}


/**
 * sets the difficulty parameters to standard
 */
function setStandardDifficulty() {
    endbossHealthPoints = 250;
    characterHitFromCasualEnemy = 10;
    characterHitFromEndboss = 25;
    casualEnemyMinSpeed = 0.25;
    casualEnemyMaxSpeed = 0.6;
}


/**
 * sets the difficulty parameters to hard
 */
function setHardDifficulty() {
    endbossHealthPoints = 250;
    characterHitFromCasualEnemy = 20;
    characterHitFromEndboss = 35;
    casualEnemyMinSpeed = 1.6;
    casualEnemyMaxSpeed = 2;
}


/**
 * sets the difficulty parameters to extremly hard
 */
function setExtremHardDifficulty() {
    endbossHealthPoints = 400;
    characterHitFromCasualEnemy = 25;
    characterHitFromEndboss = 35;
    casualEnemyMinSpeed = 3;
    casualEnemyMaxSpeed = 4;
}