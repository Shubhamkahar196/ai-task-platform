import dotenv from 'dotenv'
dotenv.config();
import connectDb from './config/db.js';
import express from 'express';

const app = express();
connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listen on ${PORT}`)
})