import { Request, Response } from "express";
import { Types } from "mongoose";
import Task from "../models/task.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/Asynchandle";

// Create a new task
const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user?._id; 

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!title?.trim()) {
    throw new ApiError(400, "Title is required");
  }

  const task = await Task.create({
    title: title.trim(),
    description: description?.trim(),
    userId,
    status: "pending"
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

// Get all tasks for logged-in user
const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { status } = req.query;

  const filter: { userId: Types.ObjectId; status?: string } = {
    userId: userId as Types.ObjectId
  };

  // Add status filter if provided
  if (status && ["pending", "in-progress", "completed"].includes(status as string)) {
    filter.status = status as string;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
});

// Get single task by ID
const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const userId = req.user?._id;

  if (!Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    userId: userId as Types.ObjectId
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task retrieved successfully"));
});

// Update task
const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;
  const userId = req.user?._id;

  if (!Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  if (!title?.trim() && !description?.trim() && !status) {
    throw new ApiError(400, "At least one field is required for update");
  }

  // Validate status if provided
  if (status && !["pending", "in-progress", "completed"].includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId: userId as Types.ObjectId },
    {
      $set: {
        ...(title && { title: title.trim() }),
        ...(description && { description: description.trim() }),
        ...(status && { status })
      }
    },
    { new: true }
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

// Delete task
const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const userId = req.user?._id;

  if (!Types.ObjectId.isValid(taskId)) {
    throw new ApiError(400, "Invalid task ID");
  }

  const task = await Task.findOneAndDelete({
    _id: taskId,
    userId: userId as Types.ObjectId
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});

export {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};