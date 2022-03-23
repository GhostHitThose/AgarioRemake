const {Circle} = require('./circle')
const global = require('./global')

class Food {
    constructor(){
        
        this.circle = new Circle(global.defaultFoodSize+Math.random()*(global.borderSize.x-global.defaultFoodSize),global.defaultFoodSize+Math.random()*(global.borderSize.y-global.defaultFoodSize),global.defaultFoodSize)
        
        const {stroke, color} = require('./utility').getRandomCS()
        this.stroke = stroke
        this.color = color
    }
}

module.exports.Food = Food