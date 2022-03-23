const Food = require('./food').Food

class FoodManager {
    constructor(){
        this.food = []

        for(var i = 0; i < 100; i++){
            this.food.push(new Food())
        }
    }

    delete(food){
        this.food.splice(this.food.indexOf(food), 1)
        this.food.push(new Food())
    }
}

module.exports.FoodManager = FoodManager;