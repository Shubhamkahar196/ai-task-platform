import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import AuthRoutes from "./routes/auth.routes.js";
import TaskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", AuthRoutes);
app.use("/api/tasks", TaskRoutes);

export default app;