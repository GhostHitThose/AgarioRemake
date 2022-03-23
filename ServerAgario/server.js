// init server
module.exports.init = () => {
    const httpServer = require('http').createServer()
    const { Server } = require('socket.io')
    const io = new Server(httpServer, {cors: {origin: '*'}})
    const port = 3000
    const {players, borderSize, speed} = require('./global')
    const FoodManager = require('./foodmanager').FoodManager

    io.on('connection', (socket) => {
        console.log("A user connection has been detected")
        const {Player} = require('./player')
        var player = new Player()
        player.spawn()
        players.push(player)

        socket.emit('connection', {player, borderSize})
  
        socket.on('test', (data) => console.log(data))
        
        socket.on('mousemove', (mouseX, mouseY, innerWidth, innerHeight) => {
            const { Vector } = require('./vector')
            var mouseOffset = new Vector(mouseX-innerWidth/2, mouseY-innerHeight/2), mousePos = mouseOffset.add(player.position)

            for(var cell of player.cells){
                var offsetToCell = mousePos.sub(cell.circle.position), angle = offsetToCell.div(offsetToCell.mag())

                cell.vx = angle.x
                cell.vy = -angle.y
            }
        })

        socket.on('disconnect', () => {
            players.splice(players.indexOf(player), 1)
        })
    })

    httpServer.listen(port, () => {
        console.log(`Listening on port ${port}`)
        const foodmanager = new FoodManager()
        setInterval(() => {
            for(var player of players) {
                var x = 0, y = 0
                for(var cell of player.cells) {
                    cell.circle.position.x += cell.vx * speed
                    cell.circle.position.y -= cell.vy * speed

                    if(cell.circle.position.x <= 0){
                        cell.circle.position.x = 0
                    }
                    if(cell.circle.position.x >= borderSize.x){
                        cell.circle.position.x = borderSize.x
                    }
                    if(cell.circle.position.y <= 0){
                        cell.circle.position.y = 0
                    }
                    if(cell.circle.position.y >= borderSize.y){
                        cell.circle.position.y = borderSize.y
                    }

                    for(var f of foodmanager.food){
                        if(cell.circle.radius >= f.circle.radius*1.75){
                            if(cell.circle.collide(f.circle)){
                                cell.circle.radius += f.circle.radius * 0.35
                                foodmanager.delete(f)
                            }
                        }
                    }

                    for(var p of players){
                        for(var c of p.cells){
                            if(cell.circle.radius >= c.circle.radius*1.75){
                                if(cell.circle.collide(c.circle)) {
                                    cell.circle.radius += c.circle.radius
                                    p.killCell(c)

                                    if(p.cells.length == 0){
                                        p.spawn()
                                    }
                                }
                            }
                        }
                    }
                    
                    x+=cell.circle.position.x
                    y+=cell.circle.position.y
                }

                x /= player.cells.length
                y /= player.cells.length

                player.position.x = x
                player.position.y = y
            }
            var foodList = foodmanager.food
            io.emit('tick', {players, borderSize, foodList})
        }, 1000/60.0)
    })
}