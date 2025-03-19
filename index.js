const express = require('express');
require("dotenv").config()
const port = process.env.PORT || 5000;

const connectDB = require("./DB")
connectDB()
const router = express.Router();
const users = require("./routes/users");

const app = express()
app.use(express.json())

app.use("/api", users)




app.listen(port, () =>{
    console.log("app is running on port", port)
})