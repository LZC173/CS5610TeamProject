/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {Button, Card, Col, FormControl, Row} from "react-bootstrap";
import { useSelector} from "react-redux";
import {useState} from "react";

export default function Dashboard({courses, allCourses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enroll, unEnroll}: {
    courses: any[];
    allCourses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (courseId: any) => void;
    updateCourse: () => void;
    enroll: (courseId: any) => void;
    unEnroll: (courseId: any) => void;
}) {
    const [showAllCourses, setShowAllCourses] = useState<boolean>(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    const handleToggling = (status: boolean) => {
        setShowAllCourses(status);
    }

    const isUserEnrolled = (courseId: string) => {
        return courses.some((course: any) => course._id === courseId);
    };

    const displayedCourses = showAllCourses ? allCourses : courses;

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => handleToggling(!showAllCourses)}>
                    {showAllCourses ? 'My Courses' : 'All Courses'}
                </button>
            </div>
            <hr/>
            {isFaculty && (
                <>
                    <h5>New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}
                        >
                            Add
                        </button>

                        <button
                            className="btn btn-warning float-end me-2"
                            onClick={updateCourse}
                            id="wd-update-course-click"
                        >
                            Update
                        </button>
                        <br/>
                        <br/>
                        <FormControl
                            value={course.name}
                            className="mb-2"
                            onChange={(e) => setCourse({...course, name: e.target.value})}
                            placeholder="Course Name"
                        />
                        <FormControl
                            as="textarea"
                            value={course.description}
                            rows={3}
                            onChange={(e) => setCourse({...course, description: e.target.value})}
                            placeholder="Course Description"
                        />
                    </h5>
                    <hr/>
                </>
            )}
            <hr/>
            <h2 id="wd-dashboard-published">
                {showAllCourses ? `All Courses (${allCourses.length})` : `My Courses (${courses.length})`}
            </h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {displayedCourses.map((courseItem: any) => (
                        <Col key={courseItem._id} className="wd-dashboard-course" style={{width: "300px"}}>
                            <Card>
                                <Link
                                    to={`/Kambaz/Courses/${courseItem._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160}/>
                                    <Card.Body className="card-body">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {courseItem.name}
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{height: "100px"}}
                                        >
                                            {courseItem.description}
                                        </Card.Text>

                                        {showAllCourses ? (
                                            // Show enroll/unenroll buttons when viewing all courses
                                            isUserEnrolled(courseItem._id) ? (
                                                <Button
                                                    variant="danger"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        unEnroll(courseItem._id);
                                                    }}
                                                >
                                                    Unenroll
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="success"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        enroll(courseItem._id)
                                                    }}
                                                >
                                                    Enroll
                                                </Button>
                                            )
                                        ) : (
                                            <>
                                                <Button variant="primary">Go</Button>
                                                {isFaculty && (
                                                    <>
                                                        <button
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                deleteCourse(courseItem._id);
                                                            }}
                                                            className="btn btn-danger float-end"
                                                            id="wd-delete-course-click"
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            id="wd-edit-course-click"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                setCourse(courseItem);
                                                            }}
                                                            className="btn btn-warning me-2 float-end"
                                                        >
                                                            Edit
                                                        </button>
                                                    </>
                                                )}
                                            </>
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