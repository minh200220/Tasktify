import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from "./routes/tasks.js";
import taskGroupRoutes from "./routes/taskGroups.js";
import teacherRoutes from "./routes/teacher.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/taskgroups", taskGroupRoutes);
app.use("/teacher", teacherRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Tasktify API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
  )
  .catch((e) => console.log(e.message));

mongoose.set("useFindAndModify", false);
