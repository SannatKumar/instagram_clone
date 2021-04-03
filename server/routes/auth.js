const express = require('express')
const router = express.Router()



router.get('/', (req, res) =>{
    res.send("Hello")
})


router.post('/signup', (req, res) =>{
    const{name, email, password} = req.body
    if(!email || !password || !name){
        res.status(422).json({error: "Please add all the fields"})
    }
    res.json({message:"Successfully posted"})
    console.log(req.body)
})

module.exports = router