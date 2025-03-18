const express = require('express');
require("dotenv").config()
const port = process.env.PORT || 5000;

const connect = require("./DB")
connect()
const app = express()
app.use(express.json())
const Users = require('./Model/userModel')


app.get("/", (req,res) =>{
    res.send("DeshRide Database is connected")
})
app.get('/users',  async(req, res) =>{
    try{
        const users = await Users.find();

        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({ message: "Server Error" });
    }
})


app.listen(port, () =>{
    console.log("app is running on port", port)
})