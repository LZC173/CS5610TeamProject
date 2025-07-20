import {Button, Col, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import {FaPlus} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import {BsGripVertical, BsPlus} from "react-icons/bs";
import {IoEllipsisVertical} from "react-icons/io5";
import { MdAssignment } from 'react-icons/md';
import AssignmentControls from "./AssignmentControls.tsx";
import "./style.css";
import { MdArrowDropDown } from "react-icons/md";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center mb-4">
                <div style={{width: "300px"}}>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch/>
                        </InputGroup.Text>
                        <Form.Control
                            id="wd-search-assignment"
                            placeholder="Search for Assignments"
                            type="text"
                        />
                    </InputGroup>
                </div>

                <div>
                    <Button
                        id="wd-add-assignment-group"
                        variant="secondary"
                        size="lg"
                        className="me-2">
                        <FaPlus className="me-2"/>
                        Group
                    </Button>
                    <Button
                        id="wd-add-assignment"
                        variant="danger"
                        size="lg">
                        <FaPlus className="me-2"/>
                        Assignment
                    </Button>
                </div>
            </div>


            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdArrowDropDown className="fs-3" />
                        Assignments
                        <div className="float-end">
                            <Button className="btn btn-outline-secondary btn-secondary rounded-4">40% of Total</Button>
                            <Button id="wd-add-assignment" className="btn btn-outline-secondary btn-secondary rounded-4"><BsPlus className="fs-4"/></Button>
                            <IoEllipsisVertical id="wd-assignemnt-controls" className="fs-4" />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <Row className="align-items-center">
                                <Col sm={1} className="d-flex justify-content-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <MdAssignment className="text-success bg-white" size={24}/>
                                </Col>
                                <Col sm={9} className="d-flex justify-content-center">
                                    <div className="d-flex flex-column">
                                        <a href="#/Kambaz/Courses/1234/Assignments/123">
                                            A1
                                        </a>
                                        <div className="wd-assignment-details">
                                            <span className="wd-fg-color-red"> Multiple Modules </span> | <strong>Not
                                            available until May 6 at 12:00am</strong> |
                                            Due May 13 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={2} className="d-flex justify-content-center">
                                    <AssignmentControls/>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <Row className="align-items-center">
                            <Col sm={1} className="d-flex justify-content-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <MdAssignment className="text-success bg-white" size={24}/>
                                </Col>
                                <Col sm={9} className="d-flex justify-content-center">
                                    <div className="d-flex flex-column">
                                        <a href="#/Kambaz/Courses/1234/Assignments/234"
                                           className="wd-assignment-link">
                                            A2
                                        </a>
                                        <div className="wd-assignment-details">
                                            <span className="wd-fg-color-red">Multiple Modules</span> | <strong>Not
                                            available until May 13 at 12:00am</strong> |
                                            Due May 20 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={2} className="d-flex justify-content-center">
                                    <AssignmentControls/>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <Row className="align-items-center">
                                <Col sm={1} className="d-flex justify-content-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <MdAssignment className="text-success bg-white" size={24}/>
                                </Col>
                                <Col sm={9} className="d-flex justify-content-center">
                                    <div className="d-flex flex-column">
                                        <a href="#/Kambaz/Courses/1234/Assignments/345"
                                           className="wd-assignment-link">
                                            A3
                                        </a>
                                        <div className="wd-assignment-details">
                                            <span className="wd-fg-color-red"> Multiple Modules</span> | <strong>Not
                                            available until May 20 at 12:00am</strong> |
                                            Due May 27 at 11:59pm | 100 pts
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={2} className="d-flex justify-content-center">
                                    <AssignmentControls/>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}