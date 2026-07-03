import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    inputText: {
      type: String,
      required: true,
      trim: true,
    },

    operation: {
      type: String,
      enum: ["uppercase", "lowercase", "reverse", "wordcount"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Running", "Success", "Failed"],
      default: "Pending",
    },

    result: {
      type: String,
      default: "",
    },

    logs: {
      type: String,
      default: "",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster user task queries
taskSchema.index({ createdBy: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;