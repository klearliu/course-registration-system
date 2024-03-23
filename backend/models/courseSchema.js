import mongoose from "mongoose";

/* Example Usage
{
    "courseName": "CMPT 100",
    "department": "Computer Science",
    "timeOfDay": "9",
    "capacity": 5,
    "studentsEnrolled": [
        "student_id_1",
        "student_id_2"
    ]
}
*/

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  timeOfDay: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export const Course = mongoose.model("Course", courseSchema);
