import mongoose from "mongoose";

/* Example #1 Usage
{
    "courseID": "0",
    "courseName": "CMPT 100",
    "department": "Computer Science",
    "timeOfDay": 9,
    "capacity": 5,
    "studentsEnrolled": []
}
*/

/* Example #2 Usage
{
  "courseID": "1",
  "courseName": "MATH 100",
  "department": "Mathematics",
  "timeOfDay": "9",
  "capacity": 5,
  "studentsEnrolled": [
    "1234567890_DB_course_id_1",
    "1234567890_DB_course_id_2"
  ]
}
*/

const courseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  timeOfDay: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
});

courseSchema.pre("save", async function (next) {
  const course = this;
  const count = await mongoose.models.Student.countDocuments({
    registeredCourses: course._id,
  });

  if (count >= course.capacity) {
    return next(new Error("Course enrollment limit reached."));
  }

  next();
});

export const Course = mongoose.model("Course", courseSchema);
