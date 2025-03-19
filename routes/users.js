const express = require("express")
const router = express.Router();

const User = require('../Model/userModel')
router.get("/users", async(req,res) =>{
    try{
        const users = await User.find();
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message,
        })
    }
})

router.post('/users', async(req,res) =>{
    try{

        const {name, role } = req.body
        const user = new User({name, role})
        await user.save()
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
})
module.exports = router