import mongoose from "mongoose";

const taskGroupSchema = mongoose.Schema({
  manhom: String,
  tennhom: String,
});

var TaskGroup = mongoose.model("TaskGroup", taskGroupSchema);

export default TaskGroup;
