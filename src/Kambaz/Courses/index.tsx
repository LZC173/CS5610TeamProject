/* eslint-disable @typescript-eslint/no-explicit-any */
import {Route, Routes} from "react-router";
import CourseNavigation from "./Navigation.tsx";
import Modules from "./Modules";
import Home from "./Home";
import Quizzes from "./Quizes";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./People/Table.tsx";
import {useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const {courses} = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
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
                            <Route path="Assignments/create" element={<AssignmentEditor />} />
                            <Route path="Zoom" element={<h1>Zoom</h1>} />
                            <Route path="Quizzes" element={<Quizzes/>}/>
                            <Route path="Piazza" element={<h1>Piazza</h1>} />
                            <Route path="People" element={<PeopleTable />} />
                        </Routes>
                    </div>
                </div>
        </div>
    );
}
