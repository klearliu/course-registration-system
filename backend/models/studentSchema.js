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
  "name": "John Doe",
  "email": "john.doe@example.com",
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
    unique: true,
  },
  registeredCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  ],
});

export const Student = mongoose.model("Student", studentSchema);
