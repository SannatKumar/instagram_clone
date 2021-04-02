const express = require('express')
const app = express()
const PORT = 5000

const customMiddleware = (req, res, next) =>{
    console.log("Middleware executed!!")
    next()
}

app.get('/home', (req, res) => {
    console.log("Home")
    res.send("Hello World")
})

app.get('/about',customMiddleware, (req, res) => {
    console.log("about")
    res.send("About Page.")
})

app.listen(PORT, ()=>{
    console.log("Server is running on", PORT)
})