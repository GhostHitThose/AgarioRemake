module.exports.getRandomCS = function getColors() {
    r = Math.floor(Math.random() * 200) + 50;
    g = Math.floor(Math.random() * 200) + 50;
    b = Math.floor(Math.random() * 200) + 50;
    return {
        color: `rgb(${r}, ${g}, ${b}`,
        stroke: `rgb(${r - 40}, ${g - 40},${b - 40})`
    }
}