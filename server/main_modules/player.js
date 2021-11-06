// mass, cells, color
const { getColors, quickSortRecursive } = require('./utils/utility');
const { border } = require('./global');
const { v4: uuidv4 } = require('uuid');
const { Cell } = require('./cell');

class Player {
    constructor(startingMass){
        const { color, stroke } = getColors();
        this.color = color;
        this.stroke = stroke;
        this.mass = startingMass;
        this.cells = [new Cell(this.mass + Math.floor(Math.random() * (border - this.mass)), this.mass + Math.floor(Math.random() * (border - this.mass)), this.mass, this.color, this.stroke)];
        this.uuidv4 = uuidv4();
    }

    killCell(cell){
        this.cells.splice(cells.indexOf(cell), 1);
    }
    kill(){
        constructor(this.startingMass);
    }
}

module.exports = {
    Player
}