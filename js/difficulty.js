/**
 * represents the current game difficulty level
 */
let currentDifficulty = 2;


/**
 * represents the health points of the end boss
 */
let endbossHealthPoints = 250;


/**
 * represents the amount of damage the character receives from a casual enemy
 */
let characterHitFromCasualEnemy = 10;


/**
 * represents the amount of damage the character receives from the end boss
 */
let characterHitFromEndboss = 25;


/**
 * represents the minimum speed of a casual enemy
 */
let casualEnemyMinSpeed = 0.2;


/**
 * represents the maximum speed of a casual enemy
 */
let casualEnemyMaxSpeed = 0.6;


/**
 * changes the game difficulty based on the provided level
 * @param {number} dfc - the desired difficulty level (1, 2, 3, or 4)
 */
function changeDifficulty(dfc) {
    currentDifficulty = dfc;
    if (dfc == 1) {
        setDifficulty(150, 5, 15, 0.15, 0.4);
    }
    if (dfc == 2) {
        setDifficulty(250, 10, 25, 0.3, 0.6);
    }
    if (dfc == 3) {
        setDifficulty(300, 20, 35, 1.6, 2.5);
    }
    if (dfc == 4) {
        setDifficulty(500, 35, 50, 4, 6);
    }
}


/**
 * sets the game difficulty parameters
 * @param {number} endbossHp - the health points of the end boss
 * @param {number} hitByEnemy - the amount of damage the character receives from a casual enemy
 * @param {number} hitByEndboss - the amount of damage the character receives from the end boss
 * @param {number} enemyMinSpeed - the minimum speed of a casual enemy
 * @param {number} enemyMaxSpeed - the maximum speed of a casual enemy
 */
function setDifficulty(endbossHp, hitByEnemy, hitByEndboss, enemyMinSpeed, enemyMaxSpeed) {
    endbossHealthPoints = endbossHp;
    characterHitFromCasualEnemy = hitByEnemy;
    characterHitFromEndboss = hitByEndboss;
    casualEnemyMinSpeed = enemyMinSpeed;
    casualEnemyMaxSpeed = enemyMaxSpeed;
}