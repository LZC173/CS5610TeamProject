// src/Kambaz/Courses/index.tsx
import { Routes, Route, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseNavigation from "./Navigation";
import Modules          from "./Modules";
import Home             from "./Home";
import PeopleTable      from "./People/Table";
import Assignments      from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizes"; 
import type { Course } from "./reducer";

export default function Courses() {
  const { cid } = useParams<{ cid: string }>();
  const { pathname } = useLocation();

  ///read everything from redux not form props !!!! 
  const courses = useSelector((state: any) => state.coursesReducer.courses) as Course[];
  const course  = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Quizzes/*" element={<Quizzes />} /> 
          </Routes>
        </div>
      </div>
    </div>
  );
}
