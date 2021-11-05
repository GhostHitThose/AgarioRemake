(() => {
  const socket = io('http://localhost:8080');
  const canvas = new Canvas();

  canvas.init();
  const ctx = canvas.ctx;

  socket.on('message', (message) => console.log(message));
  socket.on('game-info', (b) => {
    border = b;
  });

  const setMousePos = (event) => {
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.canvas.height/2), mousePosition.x - (canvas.canvas.width/2)) * 180 / Math.PI;
    let xVector;
    let yVector;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    player.xVector = xVector;
    player.yVector = yVector;
  }

  canvas.addEventListener('mousemove', setMousePos);

  socket.on('new-connection', (data) => {
    players = data.players;
    player = data.player;
    border = data.border;
    socket.on('tock', data =>{
      players = data.players;
      player = data.player;
      food = data.food;
    });
    setInterval(() => {
      requestAnimationFrame(draw);
      var xVector = player.xVector;
      var yVector = player.yVector;
      socket.emit('tick', { xVector, yVector});
      }, 10);
  });

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    var scale = 1;
    let camX = (-player.x+canvas.canvas.width/2);
    let camY = (-player.y+canvas.canvas.height/2);
    console.log(scale, player.mass);
    ctx.translate(camX, camY);
    ctx.scale(scale, scale);

    drawBoard();
    drawBorder();

    for(var f of food){
      ctx.fillStyle = f.color;
      ctx.strokeStyle = f.stroke;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.mass*2, 0, 2*Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    for (var p of players) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.mass*2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = p.stroke;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  function drawBorder(){
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,border);
    ctx.lineTo(border,border);
    ctx.lineTo(border,0);
    ctx.lineTo(0,0);
    ctx.stroke();
  }

  function drawBoard(){
    ctx.strokeStyle = 'lightgray';
    for(var i = 1; i < border/50; i++){
      ctx.beginPath();
      ctx.moveTo(0,50*i);
      ctx.lineTo(border, 50*i);
      ctx.stroke();
    }
    for(var i = 1; i < border/50; i++){
      ctx.beginPath();
      ctx.moveTo(50*i,0);
      ctx.lineTo(50*i,border);
      ctx.stroke();
    }
  }
})();