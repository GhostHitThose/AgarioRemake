const express = require('express')
const app = express({cors: {origin: '*'}})

app.use(express.static(__dirname + "/public"))

app.listen(3000)