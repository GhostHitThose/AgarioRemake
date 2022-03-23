function draw() {
    // border
    // players
    // food

    if (borderSize && players && food) {
        ctx.setTransform(1,0,0,1,0,0)
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.scale(1,1)
        ctx.translate(-player.position.x+canvas.width/2,-player.position.y+canvas.height/2)

        ctx.fillStyle = "blue"
        
        drawBorder()
        drawFood()
        drawPlayers()
    }

    requestAnimationFrame(draw)
}

function drawBorder() {
    ctx.lineWidth = 1
    ctx.strokeStyle = '#FFF'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(borderSize.x, 0)
    ctx.lineTo(borderSize.x, borderSize.y)
    ctx.lineTo(0, borderSize.y)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.stroke()
}

function drawPlayers() {
    for (var p of players) {
        for (var cell of p.cells) {
            ctx.strokeStyle = cell.stroke
            ctx.fillStyle = cell.color
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(cell.circle.position.x, cell.circle.position.y, cell.circle.radius, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
        }
    }
}

function drawFood() {
    for (var f of food) {
        ctx.strokeStyle = f.stroke
        ctx.fillStyle = f.color
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(f.circle.position.x, f.circle.position.y, f.circle.radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    }
}