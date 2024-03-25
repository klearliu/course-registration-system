# Midterm

## Completion status

Realistically. Everything works except for the add and remove course for the UI. They do work using postman.

I have made it so that:

- when a student enrolled into classes, they won't see that same class as a selection from course selection
- if there is a time conflict then in the selection table the entire row will be highlighted yellow
- when a student is selected from the current dropdown it shows its current enrolled courses

## Dependencies

The project utilizes the following dependencies:

(backend)

- "dependencies": {
  "cors": "^2.8.5",
  "express": "^4.19.1",
  "mongoose": "^8.2.3",
  "nodemon": "^3.1.0"
  }

(frontend)

- "dependencies": {
  "axios": "^1.6.8",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-icons": "^5.0.1",
  "react-router-dom": "^6.22.3"
  },
- "devDependencies": {
  "@types/react": "^18.2.66",
  "@types/react-dom": "^18.2.22",
  "@vitejs/plugin-react": "^4.2.1",
  "autoprefixer": "^10.4.19",
  "eslint": "^8.57.0",
  "eslint-plugin-react": "^7.34.1",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.6",
  "postcss": "^8.4.38",
  "tailwindcss": "^3.4.1",
  "vite": "^5.2.0"
  }

## .gitignore

The `.gitignore` file contains the following contents:
backend/node_modules
.DS_Store

fronend/node_modules

## Running Instructions

To run the project locally, follow these steps or download the shared google drive I sent through email MacEwan Email:

1. Navigate to `backend/` directory.
2. Install dependencies by running `npm i cors express mongoose`.
3. Navigate to `frontend/` directory
4. Install dependencies by running `npm i react-router-dom`
5. Test the endpoints using Postman locally and via the deployed render.

**Disclaimer:** I have included two json files of what the DB should look like by default if curious

<details open>
<summary>### Testing Locally with Postman</summary>

- **GET** - Get All Courses:
  - [http://localhost:8000/courses](http://localhost:8000/courses)
- **GET** - Get All Students:
  - [http://localhost:8000/students](http://localhost:8000/students)
- **GET** - Get Course by ID:
  - [http://localhost:8000/courses/:id](http://localhost:8000/courses/:id)
  - ex: `http://localhost:8000/courses/0`
- **GET** - Get Student by ID:
  - [http://localhost:8000/students/:id](http://localhost:8000/students/:id)
  - ex: http://localhost:8000/students/0
- **PUT** - Add Course ID to Student:
  - [http://localhost:8000/students/add_course/:\_sid/:id](http://localhost:8000/students/add_course/:_sid/:id)
  - ex: http://localhost:8000/students/add_course/65fe81d17e58a61ffb2f0d42/0
- **DELETE** - Remove CourseID from Student: - [http://localhost:8000/students/remove_course/:\_sid/:id](http://localhost:8000/students/remove_course/:_sid/:id)
  - ex: http://localhost:8000/students/remove_course/65fe81d17e58a61ffb2f0d42/0
  </details>
