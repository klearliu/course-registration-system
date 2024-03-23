import mongoose from "mongoose";

/* Example Usage
{
  "name": "Clear Liu",
  "email": "clearliu@school.com",
  "registeredCourses": [
    "course_id_1",
    "course_id_2"
  ]
}
*/

const studentSchema = new mongoose.Schema({
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
      ref: "Course",
    },
  ],
});

export const Student = mongoose.model("Student", studentSchema);
