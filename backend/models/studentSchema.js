import mongoose from "mongoose";

/* Example #1 Usage
{
  "studentID": "0",
  "name": "Clear Liu",
  "email": "clearliu@school.com",
  "registeredCourses": []
}
*/

/* Example #2 Usage
{
  "studentID": "1",
  "name": "Hugh Jazz",
  "email": "hughjazz@school.com",
  "registeredCourses": [
    "1234567890_DB_student_id_1",
    "1234567890_DB_student_id_2"
  ]
}
*/

const studentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registeredCourses: {
    type: [String],
    default: [],
    unique: true,
  },
});

export const Student = mongoose.model("Student", studentSchema);
