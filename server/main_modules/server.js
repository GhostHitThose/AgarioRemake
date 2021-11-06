function init() {
    const express = require('express');
    const app = express();
    const socket = require('socket.io');
    const port = 8080;
    const io = socket(app.listen(port, () => console.log(`Listening on port ${port}`)), { cors: { origin: '*'}});

    const { players, border, speed, startingMass, food, foodCount } = require('./global');
    const { Player } = require('./player');
    const { Food } = require('./food');
    const { quickSortRecursive } = require('./utils/utility');

    io.on('connection', (socket) => {
        console.log('A user has connected');
        var player = new Player(startingMass);
        players.push(player);
        socket.on('tick', (data) => {
            quickSortRecursive(players, 0, players.length-1);
            console.log(players);

            if(food.length < foodCount){
                var dF = foodCount - food.length;
                var f = new Food();
                food.push(f);
            }

            for(var cell of player.cells){

                let xVel;
                let yVel;

                if(!(data.xVector === undefined || data.yVector === undefined)){
                    xVel = cell.xVector = data.xVector;
                    yVel = cell.yVector = data.yVector;
                } else {
                    xVel = cell.xVector;
                    yVel = cell.yVector;
                }

                if(xVel === undefined && yVel === undefined){
                    xVel = 0;
                    yVel = 0;
                }

                if((cell.x + (speed*xVel) <= 0) || (cell.x + (speed*xVel) >= border) || (cell.y - (speed*yVel) <= 0) || (cell.y - (speed*yVel) >= border)){
                    let xTrue = false;
                    let yTrue = false;
                    if(cell.x + (speed*xVel) <= 0){
                        cell.x = 0;
                        xTrue = true;
                    }
                    if(cell.x + (speed*xVel) >= border){
                        cell.x = border;
                        xTrue = true;
                    }
                    if(cell.y - (speed*yVel) <= 0){
                        cell.y = 0;
                        yTrue = true;
                    }
                    if(cell.y - (speed*yVel) >= border){
                        cell.y = border;
                        yTrue = true;
                    }

                    if(xTrue && !yTrue){
                        cell.y -= yVel * speed;
                    }
                    if(!xTrue && yTrue){
                        cell.x += xVel * speed;
                    }
                } else {
                    cell.x += xVel * speed;
                    cell.y -= yVel * speed;
                }

                for(var p of players){
                    if(p.uuid === player.uuid) continue;

                    for(var pcell of players){
                        if(cell.mass*1.25 > pcell.mass) {
                            var dx = cell.x - pcell.x;
                            var dy = cell.y - pcell.y;
                            var dmass = pcell.mass*0.75 + cell.mass*0.75;
                            if(Math.pow(dx,2) + Math.pow(dy,2) < Math.pow(dmass,2)){
                                // two cells not of same player have collided
                                cell.mass += 0.75 * pcell.mass;
                                p.killCell();

                                if(p.cells.length <= 0){
                                    p.kill();
                                }
                            }
                        }
                    }
                }

                for(var f of food){
                    if(cell.mass * 1.25 > f.mass){
                        var dx = cell.x - f.x;
                        var dy = cell.y - f.y;
                        var dmass = f.mass*0.75 + cell.mass*0.75;
                        if(Math.pow(dx,2) + Math.pow(dy,2) < Math.pow(dmass,2)){
                            // two cells not of same player have collided
                            cell.mass += 0.75 * f.mass;
                            f.kill();
                        }
                    }
                }
            }
            socket.emit('tock', { border, player, food, players });
        });
    });
}

module.exports = { init };