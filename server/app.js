const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
//import and define
const {MONGOURI} = require('./keys')

//connection
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () =>{
    console.log("Connected to mongo yeahh!")
})

mongoose.connection.on('error', (err) =>{
    console.log("Error connecting", err)
})

//import
require('./models/user')
require('./models/post')

//middlewares
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))



//port
app.listen(PORT, ()=>{
    console.log("Server is running on", PORT)
})