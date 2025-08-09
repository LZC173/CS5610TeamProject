/* eslint-disable @typescript-eslint/no-explicit-any */
import Account from "./Account";
import {Routes} from "react-router-dom";
import {Navigate, Route} from "react-router";
import Dashboard from "./Dashboard.tsx";
import KambazNavigation from "./Navigation.tsx";
import Courses from "./Courses";
import "./style.css";
import ProtectedRoute from "./Account/ProtectedRoute.tsx";
import Session from "./Account/session.tsx";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client"
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const defaultCourse = {
        name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    };
    const [course, setCourse] = useState<any>(defaultCourse);

    const fetchCourses = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id)  ;
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAllCourses = async () => {
        try {
            const allAvailableCourses = await courseClient.fetchAllCourses();
            setAllCourses(allAvailableCourses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchAllCourses();
    }, [currentUser]);

    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([ ...courses, newCourse ]);
        setAllCourses([...allCourses, newCourse]);
        setCourse(defaultCourse);
    };

    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
        setAllCourses(allCourses.filter((course) => course._id != courseId))
    };


    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        }));
        setAllCourses(allCourses.map((c) => {
                if (c._id === course._id) { return course; }
                else { return c; }
            })
        )};


    const enroll = async(courseId: string) => {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
        const course = allCourses.find((course: any) => course._id === courseId);
        setCourses([...courses, course])
    }


    const unEnroll = async(courseId: string) => {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    }

    return (
        <Session>
            <div id="wd-kambaz">
                <KambazNavigation/>
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="/Kambaz/Account"/>}/>
                        <Route path="/Account/*" element={<Account/>}/>
                        <Route
                            path="Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        allCourses={allCourses}
                                        course={course}
                                        setCourse={setCourse}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        enroll={enroll}
                                        unEnroll={unEnroll}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="Courses/:cid/*"
                            element={
                                <ProtectedRoute requireEnrollment={true}>
                                    <Courses courses={courses} />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/Calendar" element={<h1>Calendar</h1>}/>
                        <Route path="/Inbox" element={<h1>Inbox</h1>}/>
                    </Routes>
                </div>
            </div>
        </Session>
    );
}