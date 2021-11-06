// x, y, vectorx,vectory
class Cell {
    constructor(x,y,mass,color,stroke){
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.color = color;
        this.stroke = stroke;
        this.xVector = 0;
        this.yVector = 0;
    }
}

module.exports = {
    Cell
}