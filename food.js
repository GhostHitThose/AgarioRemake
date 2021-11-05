const { border } = require("./global");
const { getColors } = require("./utils");

class Food {
    constructor(){
        this.x = Math.floor(Math.random()*border);
        this.y = Math.floor(Math.random()*border);
        const { color, stroke } = getColors();
        this.color = color;
        this.stroke = stroke;
        this.mass = 8;
    }

    kill() {
        this.x = Math.floor(Math.random()*border);
        this.y = Math.floor(Math.random()*border);
        const { color, stroke } = getColors();
        this.color = color;
        this.stroke = stroke;
        this.mass = 8;
    }
}

exports.Food = Food;