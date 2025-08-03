/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAssignment, updateAssignment} from "./reducer.ts";
import * as courseClient from "../client.ts";
import * as assignmentClient from "./client.ts";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignmentsState = useSelector((state: any) => state.assignmentsReducer);
    const assignment = aid ? assignmentsState.assignments.find((assignment: any) => assignment.course === cid  && assignment._id === aid ) : {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formatDateTimeLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const getDefaultDates = () => {
        const today = new Date();

        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 7);
        dueDate.setHours(23, 59, 0, 0);

        const availableDate = new Date(today);
        availableDate.setDate(today.getDate() + 1);
        availableDate.setHours(0, 0, 0, 0);

        const availableUntil = new Date(dueDate);
        availableUntil.setDate(dueDate.getDate() + 3);
        availableUntil.setHours(23, 59, 0, 0);

        return {
            dueDate: formatDateTimeLocal(dueDate),
            availableDate: formatDateTimeLocal(availableDate),
            availableUntil: formatDateTimeLocal(availableUntil)
        };
    };

    const defaultDates = getDefaultDates();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const assignmentData = {
            title: formData.get('title') as string || "",
            description: formData.get('description') as string || "",
            points: parseInt(formData.get('points') as string) || 100,
            assignmentGroup: formData.get('assignmentGroup') as string || "ASSIGNMENTS",
            displayGradeAs: formData.get('displayGradeAs') as string || "Percentage",
            submissionType: formData.get('submissionType') as string || "Online",
            dueDate: formData.get('dueDate') as string || "",
            availableDate: formData.get('availableDate') as string || "",
            availableUntil: formData.get('availableUntil') as string || ""
        };

        if (aid) {
            const updatedAssignment = {
                _id: aid,
                ...assignmentData,
            }
            const data = await assignmentClient.updateAssignment(updatedAssignment);
            dispatch(updateAssignment(data));
        } else {
            const newAssignment  = await courseClient.createAssignmentForCourse(cid, assignmentData);
            dispatch(addAssignment(newAssignment));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="p-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control
                        name="title"
                        id="wd-name"
                        type="text"
                        defaultValue={assignment.title || ""}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        name="description"
                        as="textarea"
                        rows={8}
                        id="wd-description"
                        defaultValue={assignment.description}/>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} htmlFor="wd-points" className="text-end">Points</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            name="points"
                            id="wd-points"
                            type="number"
                            defaultValue={assignment.points || 100}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} htmlFor="wd-group" className="text-end">Assignment Group</Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="assignmentGroup"
                            id="wd-group"
                            defaultValue={assignment.assignmentGroup || "ASSIGNMENTS"}
                        >
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} htmlFor="wd-display-grade-as" className="text-end">Display Grade as</Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            name="displayGradeAs"
                            id="wd-display-grade-as"
                            defaultValue={assignment.displayGradeAs || "Percentage"}
                        >
                            <option value="Percentage">Percentage</option>
                            <option value="Points">Points</option>
                            <option value="Letter">Letter Grade</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                    <Form.Label column sm={3} htmlFor="wd-submission-type" className="text-end">Submission Type</Form.Label>
                    <Col sm={9}>
                        <Card className="border">
                            <Card.Body>
                                <Form.Select
                                    name="submissionType"
                                    id="wd-submission-type"
                                    defaultValue={assignment.submissionType || "Online"}
                                    className="mb-3"
                                >
                                    <option value="Online">Online</option>
                                    <option value="On Paper">On Paper</option>
                                    <option value="No Submission">No Submission</option>
                                </Form.Select>

                                <div>
                                    <Form.Label><strong>Online Entry Options</strong></Form.Label>
                                    <div className="mt-2">
                                        <Form.Check
                                            type="checkbox"
                                            id="wd-text-entry"
                                            name="onlineOptions"
                                            value="textEntry"
                                            label="Text Entry"
                                            className="mb-2"
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="wd-website-url"
                                            name="onlineOptions"
                                            value="websiteUrl"
                                            label="Website URL"
                                            defaultChecked
                                            className="mb-2"
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="wd-media-recordings"
                                            name="onlineOptions"
                                            value="mediaRecordings"
                                            label="Media Recordings"
                                            className="mb-2"
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="wd-student-annotation"
                                            name="onlineOptions"
                                            value="studentAnnotation"
                                            label="Student Annotation"
                                            className="mb-2"
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="wd-file-uploads"
                                            name="onlineOptions"
                                            value="fileUploads"
                                            label="File Uploads"
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                    <Form.Label column sm={3} className="text-end">Assign</Form.Label>
                    <Col sm={9}>
                        <Card className="border">
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="wd-assign-to"><strong>Assign to</strong></Form.Label>
                                    <Form.Control
                                        name="assignTo"
                                        id="wd-assign-to"
                                        type="text"
                                        defaultValue="Everyone"
                                        className="border border-dark"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="wd-due-date"><strong>Due</strong></Form.Label>
                                    <Form.Control
                                        name="dueDate"
                                        id="wd-due-date"
                                        type="datetime-local"
                                        defaultValue={
                                            assignment.dueDate || defaultDates.dueDate
                                        }
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="wd-available-from"><strong>Available from</strong></Form.Label>
                                            <Form.Control
                                                name="availableDate"
                                                id="wd-available-from"
                                                type="datetime-local"
                                                defaultValue={
                                                    assignment.availableDate || defaultDates.availableDate
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="wd-available-until"><strong>Until</strong></Form.Label>
                                            <Form.Control
                                                name="availableUntil"
                                                id="wd-available-until"
                                                type="datetime-local"
                                                defaultValue={
                                                    assignment.availableUntil || defaultDates.availableUntil
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Form.Group>

                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2"
                            as={Link as any}
                            to={`/Kambaz/Courses/${cid}/Assignments`}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        type="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}