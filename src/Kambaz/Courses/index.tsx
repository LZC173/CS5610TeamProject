/* eslint-disable @typescript-eslint/no-explicit-any */
import {Route, Routes} from "react-router";
import CourseNavigation from "./Navigation.tsx";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./People/Table.tsx";
import {useLocation, useParams} from "react-router-dom";
import * as courseClient from "./client.ts";
import {useEffect, useState} from "react";
import Quizzes from "./Quizes";
import QuizEditor from "./Quizes/Editor";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const [enrolledUsers, setEnrolledUsers] = useState([]);
    const course = courses.find((course: any) => course._id === cid);
    const getUsers = async (cid: string) => {
        setEnrolledUsers(await courseClient.findUsersForCourse(cid));
    }
    useEffect(() => {
        getUsers(cid as string);
    }, []);
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
                        <Route path="Quizzes/:qid" element={<QuizEditor />} />
                        <Route path="Quizzes/create" element={<QuizEditor/>}/>
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="People" element={<PeopleTable users={enrolledUsers} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
