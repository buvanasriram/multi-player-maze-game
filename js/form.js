class Form{
    constructor(){
       this.input = createInput("").attribute("placeholder", "Please enter your name");
       this.button = createButton('Play');
       this.greeting = createElement('h2');
       this.title = createElement('h2');
       this.reset = createButton('Reset');
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display() {
        this.title.html("Maze Amaze");
        this.title.position(width/2, 50);
        this.title.style('font-size', '50px');
        this.title.style('color', 'skyblue');
        this.input.position(width/2,height/2);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.button.position(width/2,height-200);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'lightpink');
        this.reset.position(width/4-50, height);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', 'lightpink');

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.xPos = initPos[player.index][0];
            player.yPos = initPos[player.index][1];
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Welcome to Maze Amaze! " + player.name)
            this.greeting.position(width/2,height/2);
            this.greeting.style('color', 'white');
            this.greeting.style('font-size', '40px');
        });

        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
        });

    }
}