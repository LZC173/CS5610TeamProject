/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Col, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import {FaPlus} from "react-icons/fa6";
import {FaSearch} from "react-icons/fa";
import {BsGripVertical, BsPlus} from "react-icons/bs";
import {IoEllipsisVertical} from "react-icons/io5";
import { MdAssignment } from 'react-icons/md';
import AssignmentControls from "./AssignmentControls.tsx";
import "./style.css";
import { MdArrowDropDown } from "react-icons/md";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteAssignment, setAssignments } from "./reducer.ts";
import * as coursesClient from "../client.ts";
import * as assignmentClient from "./client.ts";
import {useEffect} from "react";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state : any) => state.assignmentsReducer)
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const dispatch = useDispatch();
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        // Format time
        const time = hours === 0 && minutes === 0 ? "12:00am" :
            hours === 23 && minutes === 59 ? "11:59pm" :
                date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).toLowerCase();

        return `${month} ${day} at ${time}`;
    };
    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    const removeAssignment = async (assignmentId: string) => {
        await assignmentClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId))
    }

    useEffect(() => {
        fetchAssignments();
    }, []);
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

                {isFaculty && (
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
                            as={Link as any}
                            to={`/Kambaz/Courses/${cid}/Assignments/create`}
                            id="wd-add-assignment"
                            variant="danger"
                            size="lg">
                            <FaPlus className="me-2"/>
                            Assignment
                        </Button>
                    </div>
                )}
            </div>


            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3"/>
                        <MdArrowDropDown className="fs-3"/>
                        Assignments
                        <div className="float-end">
                            <Button className="btn btn-outline-secondary btn-secondary rounded-4">40% of Total</Button>
                            <Button id="wd-add-assignment"
                                    className="btn btn-outline-secondary btn-secondary rounded-4"><BsPlus
                                className="fs-4"/></Button>
                            <IoEllipsisVertical id="wd-assignemnt-controls" className="fs-4" />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        {assignments
                            .filter((assignment : any) => assignment.course === cid)
                            .map((assignment : any) => (
                                <ListGroup.Item className="wd-lesson p-3 ps-1">
                                    <Row className="align-items-center">
                                        <Col sm={1} className="d-flex justify-content-center">
                                            <BsGripVertical className="me-2 fs-3" />
                                            <MdAssignment className="text-success bg-white" size={24}/>
                                        </Col>
                                        <Col sm={9} className="d-flex justify-content-center">
                                            <div className="d-flex flex-column">
                                                {isFaculty ? (
                                                    <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}>
                                                        {assignment.title}
                                                    </a>
                                                ) : (
                                                    assignment.title
                                                )}
                                                <div className="wd-assignment-details">
                                                    <span className="wd-fg-color-red"> Multiple Modules </span> | <strong>Not
                                                    available until {formatDate(assignment.availableDate)}</strong> |
                                                    Due {formatDate(assignment.dueDate)} | {assignment.points}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={2} className="d-flex justify-content-center">
                                            <AssignmentControls assignmentId={assignment._id} isFaculty={isFaculty} deleteAssignment={(assignmentId) => {
                                                removeAssignment(assignmentId)
                                            }}/>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}