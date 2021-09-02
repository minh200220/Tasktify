import express from "express";
import mongoose from "mongoose";

import TaskGroup from "../models/taskGroup.js";

const router = express.Router();

// https://restapitutorial.com/httpstatuscodes.html

export const getTaskGroups = async (req, res) => {
  try {
    const taskGroups = await TaskGroup.find();

    res.status(200).json(taskGroups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTaskGroup = async (req, res) => {
  const taskGroup = req.body;

  const newTaskGroup = new TaskGroup(taskGroup);

  try {
    await newTaskGroup.save();

    res.status(201).json(newTaskGroup);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTaskGroup = async (req, res) => {
  const { id: _id } = req.params;
  const taskGroup = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No such taskGroup with that id");

  const updatedTaskGroup = await TaskGroup.findByIdAndUpdate(
    _id,
    { ...taskGroup, _id },
    {
      new: true,
    }
  );

  res.json(updatedTaskGroup);
};

export const deleteTaskGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No taskGroup with id: ${id}`);

  await TaskGroup.findByIdAndRemove(id);

  res.json({ message: "Task Group deleted successfully." });
};

export default router;
