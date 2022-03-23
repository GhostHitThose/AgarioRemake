class Vector {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    sub(vector){
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    add(vector){
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    mul(factor){
        return new Vector(this.x * factor, this.y * factor)
    }
    
    div(factor){
        return new Vector(this.x/factor, this.y/factor)
    }

    vecMul(vector) {
        return new Vector(this.x * vector.x, this.y * vector.y)
    }
    mag() {
        return Math.sqrt(this.x*this.x + this.y * this.y)
    }

    magSquared() {
        return this.x*this.x + this.y*this.y
    }
}

module.exports.Vector = Vector