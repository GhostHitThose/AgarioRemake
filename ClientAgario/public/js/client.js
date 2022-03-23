const socket = io('serveragario.coder101.repl.co')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

socket.on('tick', (data) => {
    players = data.players
    food = data.foodList

    for(var p of players){
        if(p.uuid === player.uuid){
            player = p
        }
    }
})

socket.on('connection', (data) => {
    player = data.player
    borderSize = data.borderSize
})

canvas.addEventListener("mousemove", (e) => {
    socket.emit('mousemove', e.x, e.y, window.innerWidth, window.innerHeight)
})

requestAnimationFrame(draw)