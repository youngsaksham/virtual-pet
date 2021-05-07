class Foods{
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.image=loadImage("Milky.png")
    }
    getFoodStock(){
        return this.foodStock
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    updateFoodStock(foodStock){
      this.foodStock=foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }

    }

    bedroom(){
        background(bedroom,550,500)
    }

    garden(){
        background(garden,550,500)
    }

    washroom(){
        background(washroom,550,500)
    }

    livingRoom(){
        background(livingRoom,550,500)
    }

    display(){
        var x=200,y=100
        imageMode(CENTER)
        image(this.image,720,220,70,70);

        if (this.foodStock!==0) {
            for (var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=20;
                    y=y+50;
                }
                image(this.image,x,y,50,50)
                x=x+30
            }
        }
    }
}