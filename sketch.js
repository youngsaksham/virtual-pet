var dog,happyDog,dogg,running,sadDog;
var dogImg,database,foodS,foodStock;
var feedTime,Food,gameState;
var lastFed=0
var feed,addFood;
var washroom,bedroom,garden,livingRoom;
var currentTime,vacci,Inject_img,injection;
var viewFood,viewFood_img,viewFoodBtn;
var back1,back2,done;
var viewSchedule,viewSchedule_img,viewScheduleBtn;

function preload(){
    dogImg = loadImage("Dog.png")
    dogg = loadImage("DogSleeping.png")
    happyDog= loadImage("happydog.png")
    running=loadImage("runningLeft.png")
    washroom=loadImage("Wash Room.png")
    bedroom=loadImage("Bed Room.png")
    garden=loadImage("Garden.png")
    livingRoom=loadImage("Living Room.png")
    viewFood_img=loadImage("Food Stock.png")
    viewSchedule_img=loadImage("VaccinationSchedule.png")
    Inject_img=loadImage("DoggyInject.png")
    //sadDog=loadImage("")
}

function setup() {
   createCanvas(900, 900);
    database=firebase.database();
    food = new Foods(400,100);
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    readState=database.ref('gameState');
    readState.on("value",function(data){
      gameState=data.val();
    })

    dog = createSprite(600,250,10,10);
    dog.addImage(dogImg)
    dog.scale = 0.3
    //food=new Foods(290,100,50,50)
    viewFood=createSprite(650,750,30,30)
    viewFood.addImage(viewFood_img)
    viewFood.scale=0.3
    viewFood.visible=false;

    viewSchedule=createSprite(350,750,30,30)
    viewSchedule.addImage(viewSchedule_img)
    viewSchedule.scale=0.3
    viewSchedule.visible=false;

    injection=createSprite(450,450,900,900)
    injection.addImage(Inject_img)
    injection.visible=false;
    
    feed=createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)

    NameDog=createInput("Name your Dog")
    NameDog.position(1000,95)

    viewFoodBtn=createButton("View Food Stock")
    viewFoodBtn.position(1100,700)
    viewFoodBtn.mousePressed(seeFood);

    back1=createButton("back")
    back1.position(1100,800)
    back1.mousePressed(backk)

    viewScheduleBtn=createButton("View Vaccination Schedule")
    viewScheduleBtn.position(380,700)
    viewScheduleBtn.mousePressed(seeSchedule)

    back1=createButton("back")
    back1.position(400,800)
    back1.mousePressed(bacck)

    vacci=createButton("Proceed with Vaccination")
    vacci.position(380,750)
    vacci.scale=10
    vacci.mousePressed(proceed)
    vacci.hide();

    done=createButton("Done-->")
    done.position(1050,400)
    done.mousePressed(donedone)
    done.hide();

}
function draw() {  
  background(46, 139, 87)
  //food.display();
  stroke(0,0,0)
  textSize(20)

  feedTime=database.ref('feedTime')
    feedTime.on("value",function(data){
        lastFed=data.val();
    })
console.log(lastFed)

  fill(255,255,254);

if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  currentTime=hour();
  if (currentTime===(lastFed+1)) {
        update("Playing")
        food.garden();
        textSize(30)
        text("Its Playing Time!!",200,300)
  }else if(currentTime===(lastFed+2)){
        update("Sleeping");
        food.bedroom();
        textSize(30)
        text("Its Sleeping Time!!",200,300)
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
        update("Bathing")
        food.washroom();
        textSize(30)
        text("Its Time To Bath!!",150,300)
  }else if(foodStock===0){
    update("living room")
    food.livingRoom();
    textSize(30)
    //text("Its Sleeping Time!!",200,500)
  }
  else{
        update("Hungry")
        food.display();
  }

  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.add//Image(dogImg)
  }

 drawSprites()
}

function feedDog(){
  //dog.addImage(happyDog);
  dog.addImage(running);
  dog.x=400

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    feedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function seeFood(){
  viewFood.visible=true;
}

function backk(){
  viewFood.visible=false;
}

function seeSchedule(){
  viewSchedule.visible=true;
  vacci.show();
}

function bacck(){
  viewSchedule.visible=false;
  vacci.hide();
}

function proceed(){

  injection.visible=true;
  done.show();
}

function donedone(){
   injection.visible=false;
   done.hide();
}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS)
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
function showError(){
  console.log("Error in writing to the database");
}