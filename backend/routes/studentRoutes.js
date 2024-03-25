import express from "express";
import {
  getAllStudents,
  getStudentById,
  addCourseToStudent,
  removeCourseFromStudent,
} from "../controllers/students.controller.js";

const router = express.Router();

// Route for getting all students
router.get("/", async (request, response) => {
  try {
    const students = await getAllStudents();
    return response.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting student by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const student = await getStudentById(id);
    return response.status(200).json(student);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for adding courses to student
router.put("/add_course/:studentID/:courseID", async (request, response) => {
  try {
    const { studentID, courseID } = request.params;
    await addCourseToStudent(studentID, courseID);
    return response.status(200).send({ message: `Added Successfully` });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a course from a student's registered courses
router.delete(
  "/remove_course/:studentID/:courseID",
  async (request, response) => {
    try {
      const { studentID, courseID } = request.params;
      await removeCourseFromStudent(studentID, courseID);
      return response.status(200).send({ message: `Removed Successfully` });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
);

export default router;
