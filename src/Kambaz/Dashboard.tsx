import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {/* React JS Course */}
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
                        <Card>
                            <Link
                                to="/Kambaz/Courses/1234/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/reactjs.jpg"
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS1234 React JS
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Full Stack Software Developer
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Node.js Course */}
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
                        <Card>
                            <Link
                                to="/Kambaz/Courses/2345/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/nodejs.jpg"
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS2345 Node.js
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Backend Development with Node
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Python Course */}
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
                        <Card>
                            <Link
                                to="/Kambaz/Courses/3456/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/python.jpg"
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS3456 Python
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Programming Fundamentals in Python
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Database Systems Course */}
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
                        <Card>
                            <Link
                                to="/Kambaz/Courses/4567/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/databases.jpg"
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS4567 Database Systems
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        SQL & NoSQL Databases
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Machine Learning Course */}
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
                        <Card>
                            <Link
                                to="/Kambaz/Courses/5678/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/machine-learning.jpg"
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS5678 Machine Learning
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Intro to ML and AI Concepts
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Web Design Course */}
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
                        <Card>
                            <Link
                                to="/Kambaz/Courses/6789/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/web-design.jpg"
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS6789 Web Design
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        HTML, CSS, UX/UI Basics
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Data Structures Course */}
                    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
                        <Card>
                            <Link
                                to="/Kambaz/Courses/7890/Home"
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img
                                    variant="top"
                                    src="/images/data-structures.jpg"
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        CS7890 Data Structures
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        Algorithms and Data Structures
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}