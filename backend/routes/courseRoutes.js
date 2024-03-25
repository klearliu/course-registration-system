import express from "express";
import {
  getAllCourses,
  getCourseById,
} from "../controllers/courses.controller.js";

const router = express.Router();

// Route for getting all courses
router.get("/", async (request, response) => {
  try {
    const courses = await getAllCourses();
    return response.status(200).json({
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting course by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const course = await getCourseById(id);
    return response.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
