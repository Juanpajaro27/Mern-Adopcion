// Importaciones 
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-Parser')
const cors = require('cors')


// Use las librerias
const app = express()
require('dotenv').config()


// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

// Este es un segundo commit . Prueba

//database setup 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {console.log('Base de datos Encendida')})


// routes setup 
app.use('/api/category', require('./routes/category'))
app.use('/api/pets', require('./routes/pets'))
app.use('/api/users', require('./routes/auth'))
app.use('/api/adopted', require('./routes/adopted'))





// Escuchando el Puerto 
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor Funcionando en el puerto ${port}`)
})