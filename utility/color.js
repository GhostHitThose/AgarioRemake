module.exports = function getColors() {
  var x = 50 + Math.floor(Math.random() * (255 - 50)),
    y = 50 + Math.floor(Math.random() * (255 - 50)),
    z = 50 + Math.floor(Math.random() * (255 - 50));
  return {
    color: `rgb(${x},${y},${z})`,
    stroke: `rgb(${x + 20},${y + 20},${z + 20})`,
  };
};
