import express from "express";

import Task from "../models/task.models.js";
import { addTaskToQueue } from "../queue/task.queue.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, inputText, operation } = req.body;
    if (!title || !inputText || !operation) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Validate operation
    const allowedOperations = [
      "uppercase",
      "lowercase",
      "reverse",
      "wordcount",
    ];

    if (!allowedOperations.includes(operation)) {
      return res.status(400).json({
        success: false,
        message: "Invalid operation",
      });
    }

    const newTask = await Task.create({
      title,
      inputText,
      operation,
      createdBy: req.user.userId,
    });

    await addTaskToQueue({
      taskId: newTask._id,
      operation: newTask.operation
    })

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating task",
    });
  }
};

// Get All Tasks of Logged In User
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const response = await Task.find({
      createdBy: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Get all tasks successfully",
      count: response.length,
      tasks: response,
    });
  } catch (error) {
    console.error("Getting all tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while getting all tasks",
    });
  }
};

// Get Single Task
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const response = await Task.findOne({
      _id: id,
      createdBy: req.user.userId,
    });

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      task: response,
    });
  } catch (error) {
    console.error("get error by id :", error);

    return res.status(500).json({
      success: false,
      message: "Server error while getting id  task",
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const {id} = req.params
    const response = await Task.findOneAndDelete({
      _id: id,
      createdBy: req.user.userId,
    });
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log("Deleting task error", error);
    return res.status(500).json({
      message: "Server error during deleting task",
    });
  }
};


export const runTask = async (req, res) => {
  try {
    const {id} = req.params;

    const task = await Task.findOne({
      _id: id,
      createdBy: req.user.userId,
    })

    if(!task){
      return res.status(404).json({
        success:false,
        message: "Task not found",
      })
    }

    // reset status before sending to queue
    task.status = "Pending";
    task.result = "";
    task.logs = "";
    await task.save();

    await addTaskToQueue({
      taskId: task._id,
      operation: task.operation,
    });

    return res.status(200).json({
      success: true,
      message: "Task submitted successfully",
    });
  } catch (error) {
    console.error("Run Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting task",
    });
  }
};
