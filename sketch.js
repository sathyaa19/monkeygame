var back_image,bground;
var monkey, player_running;
var banana, bananaimage, bananagroup;
var obs, obsimage,obsgroup;

var gamestate=1;
var score=0;
var istouch=0;

function preload(){
  back_image=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimage=loadImage("banana.png");
  obsimage=loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  bground = createSprite(200,180,400,20);
  bground.addImage(back_image);
  
  monkey= createSprite(50,340,20,50);
  monkey.addAnimation("running",player_running);
  monkey.scale=0.1;
  
  ground = createSprite(0,390,400,10);
  ground.visible = false;
  
  bananagroup = new Group();
  obsgroup = new Group();
  
}

function draw() {
  background(220);
  bground.velocityX = -6;
        if(bground.x<0){
            bground.x = bground.width/2;
         }
         if(bananagroup.isTouching(monkey)){
           bananagroup.destroyEach();
           score = score + 2;
         }
         switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break; 
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
         }
        
         if(keyDown("space")  && monkey.y >= 100) {
          
              monkey.velocityY = -13;
           }
           monkey.velocityY=monkey.velocityY+0.8;
           food();
           spawnobs();
  
      monkey.collide(ground);
      
      if(obsgroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     
    }
  drawSprites();
  // display the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,200,50);
  
}

function food(){
  //write code here to display banana
  if (frameCount % 100 === 0) {
     banana = createSprite(400,120,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaimage);
    banana.scale = 0.05  ;
    banana.velocityX = -3;
    //console.log("insidde food");
     //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananagroup.add(banana);
  }
}

function spawnobs(){
  
  if(frameCount % 300 === 0) {
     obs = createSprite(400,350,10,40);
    obs.addImage(obsimage);
    obs.velocityX = -4;
            
    //assign scale and lifetime to the obstacle           
    obs.scale = 0.2;
    obs.lifetime = 300;
    //add each obstacle to the group
    obsgroup.add(obs);
  }
}