function initServer() {
    const socket = io('http://localhost:8080');
    const FPS = 1000/60.0;
    window.onload = () => {
        socket.on('tock', (data) => {
            border = data.border;
            players = data.players;
            food = data.food;
            player = data.player;
            requestAnimationFrame(draw);
        });

        document.addEventListener('mousemove', (e) => {
            const mousePosition = {
                x: e.clientX,
                y: e.clientY
            };
            const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
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
        });

        setInterval(() => {
            let xVector = player.xVector, yVector = player.yVector;
            socket.emit('tick', { xVector, yVector });
            if(canvas.width != innerWidth || canvas.height != innerHeight){
                canvas.width = innerWidth;
                canvas.height = innerHeight;
            }
        }, FPS);
    }
}