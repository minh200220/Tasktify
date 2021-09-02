import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  nhom: String,
  nguoiphancong: String,
  nguoithuchien: String,
  ngayphancong: {
    type: Date,
    default: new Date(),
  },
  ngayhethan: {
    type: Date,
    default: new Date(),
  },
  noidung: String,
  ketqua: Number,
  nhanxet: String,
});

var Task = mongoose.model("Task", taskSchema);

export default Task;
