import express from "express";
const router = express.Router();

import {
  getTeachers,
  signin,
  signup,
  updateTeacher,
} from "../controllers/teachers.js";

router.get("/", getTeachers);
router.patch("/:id", updateTeacher);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
