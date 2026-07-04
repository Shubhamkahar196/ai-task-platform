import express from 'express';
import { createTask,getAllTasks,getTaskById,deleteTask,runTask } from '../controllers/task.controllers.js';
import {authMiddleware} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post("/create", authMiddleware, createTask);

router.get("/", authMiddleware, getAllTasks);

router.get("/:id", authMiddleware, getTaskById);


router.delete("/:id", authMiddleware, deleteTask);


router.post("/:id/run", authMiddleware, runTask);

export default router;