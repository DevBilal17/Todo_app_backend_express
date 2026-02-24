const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();


const app = express();
const PORT = process.env.PORT;


app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.get("/",(req,res)=>{
   res.json({
    success : true,
    message : "Welcome to Todo API",
    data : []
   })
})


connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})