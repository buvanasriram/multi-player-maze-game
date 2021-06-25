class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        
        fill("white")
        text(mouseX + ","+ mouseY, mouseX, mouseY)   
        wall1 = createSprite(width-850, 300, 10, height-200);
        wall2 = createSprite(width-750, 0, 10, 300);
        wall3 = createSprite(width-750, 370, 10, 260);
        wall4 = createSprite(width-650, 180, 10, 220);
        wall5 = createSprite(width-650, 480, 10, 150);
        wall6 = createSprite(width-550, 40, 10, 100);
        wall7 = createSprite(width-550, 310, 10, 380);
        wall8 = createSprite(width-450, 380, 10, 380);
        wall9 = createSprite(width-350, 200, 10, 550);
        wall10 = createSprite(width-250, 100, 10, 200);
        wall11 = createSprite(width-250, 430, 10, 200);
        wall12 = createSprite(width-150, 200, 10, 180);
        wall13 = createSprite(width-150, 450, 10, 190);
        // moving walls
        wall14 = createSprite(width-800, 50, 25, 10);
        wall15 = createSprite(width-700, 100, 25, 10);
        wall16 = createSprite(width-600, 80, 25, 10);
        wall17 = createSprite(width-500, 180, 25, 10);
        wall18 = createSprite(width-400, 200, 25, 10);
        wall19 = createSprite(width-300, 240, 25, 10);
        wall20 = createSprite(width-200, 140, 25, 10);

        cup = createSprite(width-450, height/2-200, 20, 50);

        wall14.addImage(monster1_img);
        wall15.addImage(monster2_img);
        wall16.addImage(monster1_img);
        wall17.addImage(monster3_img);
        wall18.addImage(monster1_img);
        wall19.addImage(monster4_img);
        wall20.addImage(monster1_img);

        cup.addImage(cup_img);
        /*wall1.addImage(wall_img)
        wall1.rotation = 90;
        wall1.scale = 0.8;
        */

        wall14.scale = 0.1;
        wall15.scale = 0.05;
        wall16.scale = 0.1;
        wall17.scale = 0.3;
        wall18.scale = 0.1;
        wall19.scale = 0.3;
        wall20.scale = 0.1;
    
        cup.scale = 0.3;

        

        wall1.shapeColor="lightblue";
        wall2.shapeColor="pink";
        wall3.shapeColor="yellow";
        wall4.shapeColor="purple";
        wall5.shapeColor="red";
        wall6.shapeColor="lightblue"
        wall7.shapeColor="red";
        wall8.shapeColor="red";
        wall9.shapeColor="green";
        wall10.shapeColor="red";
        wall11.shapeColor="yellow";
        wall12.shapeColor="red";
        wall13.shapeColor="cyan";
        //moving walls
        wall14.shapeColor="red";
        wall15.shapeColor="red";
        wall16.shapeColor="red";
        wall17.shapeColor="red";
        wall18.shapeColor="red";
        wall19.shapeColor="red";
        wall20.shapeColor="red";

        // trophy
        cup.shapeColor="yellow";

        

        
        staticWalls = [wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10, wall11, wall12, wall13];
        //movingWalls = [wall14, wall15, wall16, wall17, wall18, wall19, wall20];
        movingWallsG = new Group();
        movingWallsG.add(wall14);
        movingWallsG.add(wall15);
        movingWallsG.add(wall16);
        movingWallsG.add(wall17);
        movingWallsG.add(wall18);
        movingWallsG.add(wall19);
        movingWallsG.add(wall20);

        player1 = createSprite(20,20);
        player1.addImage("player1",player1_img);
        player1.scale = 0.1;
        player1.debug = true;
        
        
        player2 = createSprite(width-50,20);
        player2.addImage("player2", player2_img);
        player2.scale = 0.3;
        player2.debug = true;
        player2.setCollider("rectangle", 0,0,170, 250)

        players=[player1,player2];
        edges = createEdgeSprites();
       
        
    }
    
    play(){
        
        form.hide();
        movingWallsG.bounceOff(edges);
        
        /*
        for (var i = 0; i < movingWalls.length; i++) {
            movingWalls[i].bounceOff(edges);
        }*/
        
        Player.getPlayerInfo();
        
        var x, y, index =0;
       
        for(var plr in allPlayers){
            index = index+1;
            x = allPlayers[plr].xPos;
            y= allPlayers[plr].yPos;
            
            players[index-1].x = x;
            players[index-1].y = y;
            
            if(index === player.index){
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25);
            }
        }    
       
        if (player.index !== null) {
            //players[player.index-1].bounceOff(edges);
            for (var j = 0; j < staticWalls.length; j++){
                if (players[player.index-1].isTouching(staticWalls[j])) {
                      if (player.index === 2) {
                        player.xPos +=20;
                        player.yPos +=20;
                      }
                      else {
                        player.xPos -=20;
                        player.yPos -=20;
                      }
                      
                      player.update();
                }
            }
            if (keyIsDown(RIGHT_ARROW) && player.xPos < width-15) {
                player.xPos += 10
                player.update();
            }
            if (keyIsDown(LEFT_ARROW) && player.xPos > 15 ) {
                player.xPos -= 10
                player.update();
            }
            if (keyIsDown(UP_ARROW) && player.yPos > 15) {
                player.yPos -= 10
                player.update();
            }
            if (keyIsDown(DOWN_ARROW) && player.yPos < height-15) {
                player.yPos += 10
                player.update();
            }
            if (players[player.index-1].isTouching(movingWallsG)) {
                gameState = 2;
            }
            if (players[player.index-1].isTouching(cup)) {
                gameState = 3;
            }
        }
        player1.bounceOff(edges)    ;
        player2.bounceOff(edges)    ;
        drawSprites();
    }

    endWin(){
        fill("white")
        text("You Win!", width/2, height/2);
        //for (var i=0; i<movingWalls.length; i++) movingWalls[i].velocityY = 0;
        movingWallsG.setVelocityYEach(0);
    }
    endLose(){
        fill("white")
        text("You Lose!", width/2, height/2);
        //for (var i=0; i<movingWalls.length; i++) movingWalls[i].velocityY = 0;
        movingWallsG.setVelocityYEach(0);
    }
}