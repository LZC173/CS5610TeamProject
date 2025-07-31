/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {Button, Card, Col, FormControl, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {addCourse, deleteCourse, updateCourse} from "./Courses/reducer.ts";
import {addEnrollment, deleteEnrollment} from "./Courses/enrollmentsReducer.tsx";

export default function Dashboard() {
    const defaultCourse = {
        name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    };
    const [course, setCourse] = useState<any>(defaultCourse);
    const [showAllCourses, setShowAllCourses] = useState<boolean>(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const {courses} = useSelector((state: any) => state.coursesReducer);
    const dispatch = useDispatch();
    const handleToggling = (status: boolean) => {
        setShowAllCourses(status)
    }
    const enrolledCourseIds = useMemo(() => {
        return new Set(
            enrollments
                .filter((enrollment: any) => enrollment.user === currentUser._id)
                .map((enrollment: any) => enrollment.course)
        );
    }, [enrollments, currentUser._id]);
    const isUserEnrolled = (courseId: string) => {
        return enrolledCourseIds.has(courseId)
    };
    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => handleToggling(!showAllCourses)}>
                    Enrollments
                </button>
            </div>
            <hr/>
            {isFaculty && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={() => dispatch(addCourse(course))}> Add </button>

                        <button className="btn btn-warning float-end me-2"
                                onClick={() => {
                                    dispatch(updateCourse(course));
                                    setCourse(defaultCourse)
                                }} id="wd-update-course-click">
                            Update
                        </button>
                        <br/>
                        <br/>
                        <FormControl value={course.name} className="mb-2"
                                     onChange={(e) => setCourse({...course, name: e.target.value})}/>
                        <FormControl as="textarea" value={course.description} rows={3}
                                     onChange={(e) => setCourse({...course, description: e.target.value})}/>
                    </h5>
                    <hr/>
                </>
            )}
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {(showAllCourses ? courses :
                            courses.filter((course: any) =>
                                enrollments.some(
                                    (enrollment: any) =>
                                        enrollment.user === currentUser._id &&
                                        enrollment.course === course._id
                                )
                            )
                    ).map((course: any) => (
                            <Col key={course._id} className="wd-dashboard-course" style={{width: "300px"}}>
                                <Card>
                                    <Link to={`/Kambaz/Courses/${course._id}/Home`}
                                          className="wd-dashboard-course-link text-decoration-none text-dark">
                                        <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160}/>
                                        <Card.Body className="card-body">
                                            <Card.Title
                                                className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                                {course.name} </Card.Title>
                                            <Card.Text className="wd-dashboard-course-description overflow-hidden"
                                                       style={{height: "100px"}}>
                                                {course.description} </Card.Text>
                                            {showAllCourses ? (
                                                isUserEnrolled(course._id) ? (
                                                    <Button
                                                        variant="danger"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(deleteEnrollment({user: currentUser._id, course: course._id}))
                                                        }}>
                                                        Unenroll
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="success"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            dispatch(addEnrollment({user: currentUser._id, course: course._id}))
                                                        }}>
                                                        Enroll
                                                    </Button>
                                                )
                                            ) : (
                                                <>
                                                    <Button variant="primary"> Go </Button>
                                                    {isFaculty && (
                                                        <>
                                                            <button onClick={(event) => {
                                                                event.preventDefault();
                                                                dispatch(deleteCourse(course._id));
                                                            }} className="btn btn-danger float-end"
                                                                    id="wd-delete-course-click">
                                                                Delete
                                                            </button>
                                                            <button id="wd-edit-course-click"
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        setCourse(course);
                                                                    }}
                                                                    className="btn btn-warning me-2 float-end">
                                                                Edit
                                                            </button>
                                                        </>
                                                    )}</>
                                            )}
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
}