const express = require('express')
const app = express()
const PORT = 5000



app.get('/home', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log("Server is running on", PORT)
})