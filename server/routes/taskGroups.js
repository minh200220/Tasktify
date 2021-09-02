import express from "express";

import {
  getTaskGroups,
  createTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
} from "../controllers/taskGroups.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTaskGroups);
router.post("/", auth, createTaskGroup);
router.patch("/:id", auth, updateTaskGroup);
router.delete("/:id", auth, deleteTaskGroup);

export default router;
