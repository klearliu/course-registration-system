import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdAddCircleOutline, MdRemoveCircle } from "react-icons/md";
import "./Home.css";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .all([
        axios.get("http://localhost:8000/courses"),
        axios.get("http://localhost:8000/students"),
      ])
      .then(
        axios.spread((coursesResponse, studentsResponse) => {
          setCourses(coursesResponse.data.data);
          setStudents(studentsResponse.data.data);
          setLoading(false);
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Filter registered courses based on selected student
  const selectedStudentData = students.find(
    (student) => student.studentID === selectedStudent
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Course Registration</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <label htmlFor="student" className="mr-2 text-lg font-bold">
              Select Student:
            </label>
            <select
              id="student"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student._id} value={student.studentID}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border border-gray-600">Course ID</th>
                <th className="border border-gray-600">Course Name</th>
                <th className="border border-gray-600">Department</th>
                <th className="border border-gray-600">Time Of Day</th>
                <th className="border border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses
                .filter((course) => {
                  // Filter out courses that are already registered by the selected student
                  return (
                    !selectedStudentData ||
                    !selectedStudentData.registeredCourses.includes(
                      course.courseID
                    )
                  );
                })
                .map((course) => (
                  <tr
                    key={course._id}
                    className={`h-8 ${
                      selectedStudentData &&
                      selectedStudentData.registeredCourses.some((courseID) => {
                        const registeredCourse = courses.find(
                          (c) => c.courseID === courseID
                        );
                        return registeredCourse.timeOfDay === course.timeOfDay;
                      })
                        ? "highlighted-row"
                        : ""
                    }`}
                  >
                    <td className="border border-gray-700 text-center">
                      {course.courseID}
                    </td>
                    <td className="border border-gray-700 text-center">
                      {course.courseName}
                    </td>
                    <td className="border border-gray-700 text-center">
                      {course.department}
                    </td>
                    <td className="border border-gray-700 text-center">
                      {course.timeOfDay +
                        ":00 - " +
                        (parseInt(course.timeOfDay) + 1) +
                        ":00"}
                    </td>
                    <td className="border border-gray-700 items-center">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/student.${selectedStudent}/${course._id}`}>
                          <MdAddCircleOutline />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedStudentData && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">
                {selectedStudentData.name}'s Courses
              </h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-600">Course ID</th>
                    <th className="border border-gray-600">Course Name</th>
                    <th className="border border-gray-600">Time Of Day</th>
                    <th className="border border-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudentData.registeredCourses.map((courseID) => {
                    const course = courses.find(
                      (course) => course.courseID === courseID
                    );
                    return (
                      <tr key={courseID} className="h-8">
                        <td className="border border-gray-700 text-center">
                          {course.courseID}
                        </td>
                        <td className="border border-gray-700 text-center">
                          {course.courseName}
                        </td>
                        <td className="border border-gray-700 text-center">
                          {course.timeOfDay +
                            ":00 - " +
                            (parseInt(course.timeOfDay) + 1) +
                            ":00"}
                        </td>
                        <td className="border border-gray-700 items-center">
                          <div className="flex justify-center gap-x-4">
                            <Link
                              to={`/student.${selectedStudent}/${course._id}`}
                            >
                              <MdRemoveCircle />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
