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
    console.log("Retrieved students:", studentData);
    const studentsArray = studentData.map((student) => student.toObject());
    return studentsArray;
  } catch (error) {
    console.error("Error retrieving students:", error);
    throw error;
  }
}
