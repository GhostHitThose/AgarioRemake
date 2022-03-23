const {Vector} = require('./vector')

class Circle {
    constructor(x,y, radius) {
        this.position = new Vector(x,y)
        this.radius = radius
    }

    collide(circle){
        var dx = Math.max(this.position.x, circle.position.x) - Math.min(this.position.x, circle.position.x)
        var dy = Math.max(this.position.y, circle.position.y) - Math.min(this.position.y, circle.position.y)

        return (dx*dx + dy*dy <= (this.radius + circle.radius)*(this.radius + circle.radius))
    }
}
module.exports.Circle = Circle