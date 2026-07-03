import express from 'express';
import { createTask,getAllTasks,getTaskById,deleteTask } from '../controllers/task.controllers.js';
import {authMiddleware} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post("/create", authMiddleware, createTask);

router.get("/", authMiddleware, getAllTasks);

router.get("/:id", authMiddleware, getTaskById);


router.delete("/:id", authMiddleware, deleteTask);

// Later
// router.post("/:id/run", authMiddleware, runTask);

export default router;