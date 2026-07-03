import express from 'express';

import Task from '../models/task.models.js';

// Create Task
export const createTask = async (req, res) => {
    try {
        const {title,inputText,operation} = req.body;
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
}

// Get All Tasks of Logged In User
export const getAllTasks = async (req, res) => {}

// Get Single Task
export const getTaskById = async (req, res) => {}



// Delete Task (Optional)
export const deleteTask = async (req, res) => {}

// Run Task (Redis Integration Later)
export const runTask = async (req, res) => {}