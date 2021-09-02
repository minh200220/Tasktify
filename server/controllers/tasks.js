import express from "express";
import mongoose from "mongoose";

import Task from "../models/task.js";

const router = express.Router();

// https://restapitutorial.com/httpstatuscodes.html

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const task = req.body;

  const newTask = new Task(task);

  try {
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id: _id } = req.params;
  const task = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No such task with that id");

  const updatedTask = await Task.findByIdAndUpdate(
    _id,
    { ...task, _id },
    {
      new: true,
    }
  );

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No task with id: ${id}`);

  await Task.findByIdAndRemove(id);

  res.json({ message: "Task deleted successfully." });
};

export default router;
