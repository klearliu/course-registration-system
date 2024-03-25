import { Student } from "../models/studentSchema.js";
import mongoose from "mongoose";
import { mongoURL } from "../config.js";

/* Function to retrieve students and store them into an array

    - try:
        - connect to DB
        - query the "students" collection and gather all documents
        - store the gathered data in an object array
        - returns the object array
    - catch:
        - error message
*/
export async function getAllStudents() {
  try {
    await mongoose.connect(mongoURL);
    const studentData = await Student.find({});
    const studentsArray = studentData.map((student) => student.toObject());
    return studentsArray;
  } catch (error) {
    console.error("Error retrieving students:", error);
    throw error;
  }
}

/* Function to retrieve student by ID and store its info into an array

    - try:
        - connect to DB
        - find by studentID
        - return found student object or null if DNE
    - catch:
        - error message
*/
export async function getStudentById(studentId) {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(mongoURL);

    // Query the database to find the student by ID
    const student = await Student.findOne({ studentID: studentId });

    // Return the found student object or null if not found
    return student ? student.toObject() : null;
  } catch (error) {
    console.error("Error retrieving student by ID:", error);
    throw error;
  }
}

/* Function to add a course to a student's registeredCourses array
  
  - Parameters:
      - studentId: ID of the student
      - courseId: ID of the course to add
  
    - try:
        - connect to DB
        - find by studentID and pushes courseID to registeredCourses
        - updates the student document section
    - catch:
        - error message
*/
export async function addCourseToStudent(studentID, courseID) {
  try {
    await mongoose.connect(mongoURL);

    courseID = String(courseID);

    await Student.findByIdAndUpdate(
      studentID,
      { $push: { registeredCourses: courseID } },
      { new: true }
    );
  } catch (error) {
    console.error("Error adding course to student:", error);
    throw error;
  }
}

/* Function to remove a course from a student's registeredCourses array
  - Parameters:
      - studentId: ID of the student
      - courseId: ID of the course to remove
    
    - try:
        - connect to DB
        - find by studentID and removes courseID within registeredCourses
        - updates the student document section
    - catch:
        - error message
*/
export async function removeCourseFromStudent(studentID, courseID) {
  try {
    await mongoose.connect(mongoURL);
    await Student.findByIdAndUpdate(
      studentID,
      { $pull: { registeredCourses: courseID } },
      { new: true }
    );
  } catch (error) {
    console.error("Error removing course from student:", error);
    throw error;
  }
}
