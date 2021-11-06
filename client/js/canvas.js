const canvas = $('#canvas')[0];
const context = canvas.getContext('2d');

function initCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.backgroundColor = '#222';
    canvas.style.position = 'absolute';
}

function draw() {

    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.translate((canvas.width/2) - player.cells[0].x, (canvas.height/2) - player.cells[0].y);


    drawBorder();
    drawFood();
    drawPlayers();
}

function drawBorder() {
    context.strokeStyle = '#FFF';
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0,border);
    context.lineTo(border,border);
    context.lineTo(border,0);
    context.lineTo(0,0);
    context.stroke();
}

function drawFood() {
    for(var f of food){
        context.strokeStyle = f.stroke;
        context.fillStyle = f.color;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(f.x, f.y, f.mass*2, 0, Math.PI*2);
        context.fill();
        context.stroke();
    }
}

function drawPlayers(){
    for(var player of players) {
        for(var cell of player.cells){
            context.strokeStyle = cell.stroke;
            context.fillStyle = cell.color;
            context.lineWidth = 3;
            context.beginPath();
            context.arc(cell.x, cell.y, cell.mass, 0, Math.PI*2);
            context.fill();
            context.stroke();
        }
    }
}