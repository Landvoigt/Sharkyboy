let canvas;
let ctx;
let world = new World();

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // character.src = '../img/2_character_pepe/1_idle/idle/I-1.png';

    // ctx.drawImage(character, 20, 20, 50, 150);
    console.log(world.character, world.enemies);

}