const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.post('./createpost', (req, res)=>{
    const{title, body} = req.body
    if(!title || !body){
        res.status(422).json({error: "Please add all the fields."})
    }
    const post = new post ({
        title,
        body,
        postedBy
    })
})
module.exports = router