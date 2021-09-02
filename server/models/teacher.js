import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  id: { type: String },
  mscb: { type: String, required: true },
  ten: { type: String, required: true },
  vaitro: { type: Number, required: true },
  hocvi: { type: String, required: true },
  chucvu: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Teacher", teacherSchema);
