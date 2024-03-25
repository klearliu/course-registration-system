import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import courseRoutes from "./routes/courseRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);

app.get("/", async (request, response) => {
  console.log(request);
  return response.status(234).send("CMPT 315 Midterm");
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
