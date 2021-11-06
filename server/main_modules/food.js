const { border, foodSize } = require('./global');

class Food {
    constructor() {
        this.mass = foodSize;
        this.x = this.mass + Math.floor(Math.random() * (border - this.mass));
        this.y = this.mass + Math.floor(Math.random() * (border - this.mass));
        const { color, stroke } = require('./utils/utility').getColors();
        this.color = color;
        this.stroke = stroke;
    }

    kill() {
        this.x = this.mass + Math.floor(Math.random() * (border - this.mass));
        this.y = this.mass + Math.floor(Math.random() * (border - this.mass));
        const { color, stroke } = require('./utils/utility').getColors();
        this.color = color;
        this.stroke = stroke;
    }
}

module.exports = { Food }