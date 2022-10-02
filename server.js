const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors());

/* const connectDB =  */
app.get('/',(req,res)=>{
    res.status(200).json({message: 'express setup'})
})

const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})