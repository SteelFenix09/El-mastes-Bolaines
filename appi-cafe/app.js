const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const productoRoute = require("./routes/Producto.routes")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//app.use(express.static('uploads'))
app.use(express.static(path.join(__dirname, 'uploads')))
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors())

app.use('/api', productoRoute)

module.exports = app