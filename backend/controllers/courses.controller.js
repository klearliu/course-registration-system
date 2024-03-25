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

/* Function to retrieve course by ID and store its info into an array
   - try:
       - connect to DB
       - find by courseID
       - return found course object or null if DNE
   - catch:
       - error message
*/
export async function getCourseById(courseId) {
  try {
    await mongoose.connect(mongoURL);

    // Query the database to find the course by ID
    const course = await Course.findOne({ courseID: courseId });

    // Return the found course object or null if not found
    return course ? course.toObject() : null;
  } catch (error) {
    console.error("Error retrieving course by ID:", error);
    throw error;
  }
}
