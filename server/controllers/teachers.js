import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import Teacher from "../models/teacher.js";

const secret = "test";

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  const { id: _id } = req.params;
  const teacher = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No such teacher with that id");

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    _id,
    { ...teacher, _id },
    {
      new: true,
    }
  );

  res.json(updatedTeacher);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await Teacher.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    ten,
    mscb,
    hocvi,
    chucvu,
    vaitro,
  } = req.body;

  try {
    const oldUser = await Teacher.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const oldMscb = await Teacher.findOne({ mscb });
    if (oldMscb)
      return res.status(400).json({ message: "Mscb already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Teacher.create({
      email,
      password: hashedPassword,
      ten,
      mscb,
      hocvi,
      chucvu,
      vaitro,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
