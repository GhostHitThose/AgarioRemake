const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const port = 8080;
const Player = require("./game/player");
const {
  players,
  border,
  startingMass,
  food,
  maxFood,
} = require("./game/game.config");

io.on("connection", (socket) => {
  var player = new Player(border, startingMass);
  players.push(player);
  socket.on("move", (mAngleX, mAngleY) => {
    //TODO
  });
});

setInterval(() => {
  io.emit("tick", players, border, food);
}, 1000 / 60.0);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index/index.html");
});

server.listen(port, () => console.log(`Listening on port ${port}`));
