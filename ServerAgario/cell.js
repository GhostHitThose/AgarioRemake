const { Circle } = require('./circle')

class Cell {
    constructor(mass, color, stroke, x, y) {
        this.circle = new Circle(x,y,mass)
        this.color = color
        this.stroke = stroke
        this.vx = 0
        this.vy = 0
    }
}

module.exports.Cell = Cell