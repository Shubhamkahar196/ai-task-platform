import express from "express";
import cookieParser from "cookie-parser";

import AuthRoutes from "./routes/auth.routes.js";
import TaskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/tasks", TaskRoutes);

export default app;