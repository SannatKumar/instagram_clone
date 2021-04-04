const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')


router.post('/signup', (req, res) =>{
    const{name, email, password} = req.body
    if(!email || !password || !name){
        res.status(422).json({error: "Please add all the fields"})
    }
    //Querying into the database
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that email"})
        }
        //hashing the password
        bcrypt.hash(password,12)
        .then(hashedPassword =>{
            const user = new User({
                email,
                password:hashedPassword,
                name
            })
            
            //saving the user
            user.save()
            .then(user =>{
                res.json({message:"Saved Successfully."})
            })
            .catch(err=>{
                console.log(err)
            })
        })

    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/signin', (req, res) =>{
    const{email, password} = req.body
    if(!email || !password) {
        res.status(422).json({err:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser =>{
        if(!savedUser){
            res.status(422).json({error: "Invalid Email or Password."})
        }
        //password compare
        bcrypt.compare(password, savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                //res.json({message: "Successfully Singed in"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                res.json({token})
            }
            else{
                res.status(422).json({error: "Invalid Email or Password."})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})




module.exports = router