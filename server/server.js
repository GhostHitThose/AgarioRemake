var io;

function init() {
  const express = require('express');
  const app = express();
  const port = 8080;
  const expressServer = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  const Server = require('socket.io').Server;
  io = new Server(expressServer, { cors: { origin: '*'}});
  const players = require('./global').players;
  const Player = require('./player').Player;
  const border = require('./global').border;
  const food = require('./global').food;
  const Food = require('./food').Food;
  const speed = require('./global').speed;
  const quickSortRecursive = require('./utils').quickSortRecursive;

  io.on('connection', (socket) => {
    console.log("A client has conneced to the server");
    socket.send("You have successfully connected");
    const player = new Player();
    players.push(player);
    socket.emit('new-connection', {players,player,border});
    socket.on('tick', (data) => {

      quickSortRecursive(players, 0, players.length - 1);

      if(data.xVector === undefined || data.yVector === undefined){
        player.xVector = 0;
        player.yVector = 0;
      }

      if(food.length < 200){
        var loop = 200-food.length;
        for(var i = 0; i < loop; i++){
          var f = new Food();
          food.push(f);
        }
      }

      let xVel = player.xVector = data.xVector;
      let yVel = player.yVector = data.yVector;

      if(player.x + speed*xVel >= border){
        player.x = border;
      }
      if(player.x+speed*xVel <= 0) {
        player.x = 0;
      }
      if(player.y+speed*yVel <= 0){
        player.y = 0;
      }
      if(player.y+speed*yVel >= border){
        player.y = border;
      }
      player.x += speed*xVel;
      player.y -= speed*yVel;

      var x = player.x;
      var y = player.y;

      for(p of players){
        if(player.mass >= p.mass*1.25 && (player.x + player.mass*2- player.mass/3 >= p.x && player.x - player.mass*2+ player.mass/3 <= p.x) && (player.y + player.mass*2- player.mass/3 >= p.y && player.y - player.mass*2+ player.mass/3 <= p.y)){
          player.mass += p.mass/4;
          p.kill();
        }
        for(f of food){
          if(player.mass >= f.mass*1.25 && (player.x + player.mass*2 - player.mass/3 >= f.x && player.x - player.mass*2+ player.mass/3 <= f.x) && (player.y + player.mass*2- player.mass/3 >= f.y && player.y - player.mass*2+ player.mass/3 <= f.y)){
            player.mass += f.mass/4;
            f.kill();
          }
        }
      }

      socket.emit('tock', {players,food,player});
    });
  });
};

exports.init = init;
exports.io = io;