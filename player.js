const border = require('./global').border;
const { getColors } = require("./utils");

class Player {
  constructor() {
    this.mass = 16;
    this.x = this.mass*2 + Math.random()*(border - this.mass*2);
    this.y = this.mass*2 + Math.random()*(border - this.mass*2);
    const { color, stroke } = getColors();
    this.color = color;
    this.stroke = stroke;
    this.xVector = 0;
    this.yVector = 0;
  }

  kill() {
    this.mass = 16;
    this.x = this.mass*2 + Math.random()*(border - this.mass*2);
    this.y = this.mass*2 + Math.random()*(border - this.mass*2);
    const { color, stroke } = getColors();
    this.color = color;
    this.stroke = stroke;
    this.xVector = 0;
    this.yVector = 0;
  }
}

exports.Player = Player;