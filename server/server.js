import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import todoRoutes from './routes/todoRoutes.js'
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app=express();

app.use(
    cors(
        {
            origin:process.env.FRONTEND_URL
            
        }
    )
)

//middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todos",todoRoutes)


app.get("/",(req,res)=>{
    res.send("Backend Server Running...")
})

//mongodb

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB Connected...")
});


//port
const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})