const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Task title must be at least 3 characters long"],
      maxlength: [100, "Task title must be at most 100 characters long"]
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Task description must be at most 500 characters long"]
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    dueDate: {
      type: Date
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);