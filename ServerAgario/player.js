const {Vector} = require('./vector')
const {Cell} = require('./cell')
const { v4 } = require('uuid');

class Player {
    constructor() {
        const { color, stroke } = require('./utility').getRandomCS()
        this.color = color
        this.stroke = stroke
        this.position = 0
        this.cells = []
        this.uuid = v4()
    }

    spawn() {
        const {defaultMass, borderSize} = require('./global')
        this.mass = defaultMass
        this.position = new Vector(Math.random()*(borderSize.x-this.mass)+this.mass, Math.random()*(borderSize.y-this.mass)+this.mass)
        this.cells = [new Cell(this.mass, this.color, this.stroke, this.position.x, this.position.y)]
    }

    killCell(cell){
        this.cells.splice(this.cells.indexOf(cell), 1)
    }
}

module.exports.Player = Player