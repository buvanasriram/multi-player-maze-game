var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;
var player1score =0;
var player2score =0;
var wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10;
var wall11, wall12, wall13, wall14, wall15, wall16, wall17, wall18, wall19, wall20;
var cup, edges;
var staticWalls, movingWalls, movingWallsG;
var initPos = [[0,0], [50,50], [900,50]];
var setMoving = false;

function preload(){
  player1_img = loadImage("images/boy1.png");
  player2_img = loadImage("images/boy2.png");
  monster1_img = loadImage("images/monster1.png");
  monster2_img = loadImage("images/monster2.png");
  monster3_img = loadImage("images/monster3.png");
  monster4_img = loadImage("images/monster4.png");
  cup_img = loadImage("images/trophy.png");
  wall_img = loadImage("images/xx.png");

}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {
  background("black");
  
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     background("black");
     if (setMoving == false) {
      wall14.velocityY = 4;
      wall15.velocityY = 2;
      wall16.velocityY = 3;
      wall17.velocityY = 3;
      wall18.velocityY = 4;
      wall19.velocityY = 2;
      wall20.velocityY = 4;
      setMoving = true;     
     }
     game.play();
   }
   if (gameState === 2) {
     game.endLose();
     drawSprites();
   }
   if (gameState === 3) {
    game.endWin();
    drawSprites();
  }
   
}