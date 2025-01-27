import express from "express";
import {PORT,MONGODB_URI} from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// middleware for parsing request body
app.use(express.json());

// Middleware to handle cors policy
app.use(cors());

app.get('/',(req,res)=>{
    return res.status(234).send('Home Page is here')
});

app.use('/books',bookRoute);

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("Mongodb Connected successfully");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})