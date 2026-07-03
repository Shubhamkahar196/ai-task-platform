import dotenv from 'dotenv'
dotenv.config();

import connectDb from './config/db.js';

import express from 'express';

import AuthRoutes from './routes/auth.routes.js'
import TaskRoutes from "./routes/task.routes.js"

const app = express();
connectDb();
app.use(express.json());

app.use("/api/auth",AuthRoutes);
app.use("/api/tasks",TaskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listen on ${PORT}`)
})