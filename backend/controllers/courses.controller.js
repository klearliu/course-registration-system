import { Course } from "../models/courseSchema.js";
import mongoose from "mongoose";
import { mongoURL } from "../config.js";

/* Function to retrieve courses and store them into an array
   - try:
       - connect to DB
       - query the "courses" collection and gather all documents
       - store the gathered data in an object array
       - returns the object array
   - catch:
       - error message
*/
export async function getAllCourses() {
  try {
    await mongoose.connect(mongoURL);
    const courseData = await Course.find({});
    console.log("Retrieved courses:", courseData);
    const coursesArray = courseData.map((course) => course.toObject());
    return coursesArray;
  } catch (error) {
    console.error("Error retrieving courses:", error);
    throw error;
  }
}
