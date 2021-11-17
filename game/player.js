const getColors = require("../utility/color");

module.exports = class Player {
  constructor(border, mass) {
    this.x = Math.random() * border;
    this.y = Math.random() * border;
    this.mass = mass;
    const { color, stroke } = getColors();
    this.cells = [new Cell(x, y, mass, color, stroke)];
  }
  split() {
    // TODO
  }
};
