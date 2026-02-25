const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/test");
const { swaggerUi, specs } = require("./swagger");
dotenv.config();


const app = express();
const PORT = process.env.PORT;


app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/api/auth",authRoutes)
app.use(testRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))




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