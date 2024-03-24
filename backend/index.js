import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { getAllStudents } from "./controllers/students.controller.js";
import { getAllCourses } from "./controllers/courses.controller.js";

const app = express();

app.get("/", async (request, response) => {
  try {
    // Retrieve students data
    const students = await getAllStudents();

    // Retrieve courses data
    const courses = await getAllCourses();

    // Send the students data as a JSON response
    //response.json(students);
    response.json(courses);
  } catch (error) {
    console.error("Error retrieving students:", error);
    response.status(500).send("Error retrieving students");
  }
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
