import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaRegKeyboard } from "react-icons/fa";
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import './style.css';
import {Link} from "react-router-dom";
import {useParams} from "react-router";

export default function QuizDetails() {
    const { cid, setCid } = useParams();
    const [content, setContent] = useState('');
    const [wordCount, setWordCount] = useState(0);

    return (
        <div className="mb-4 p-3">
            <Form>
                <Form.Group className="mb-3 assignment_name">
                    <Form.Control
                        id="wd-name"
                        type="text"
                        defaultValue={'unnamed assignment'}/>
                </Form.Group>

                <div className = "description_editor">
                    <label className="form-label fw-medium">Quiz Instructions:</label>
                    <div className="border rounded-top bg-light px-3 py-2">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex gap-3">
                                <button className="btn btn-link p-0 text-black text-decoration-none small">Edit</button>
                                <button className="btn btn-link p-0 text-black text-decoration-none small">View</button>
                                <button className="btn btn-link p-0 text-black text-decoration-none small">Insert
                                </button>
                                <button className="btn btn-link p-0 text-black text-decoration-none small">Format
                                </button>
                                <button className="btn btn-link p-0 text-black text-decoration-none small">Tools
                                </button>
                                <button className="btn btn-link p-0 text-black text-decoration-none small">Table
                                </button>
                            </div>
                            <span className="text-success small">📶 100%</span>
                        </div>
                    </div>
                    <div>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={() => {
                                console.log("handle editor changes")
                            }}
                            style={{height: '200px'}}
                            modules={{
                                toolbar: [
                                    [{'size': ['small', false, 'large', 'huge']}],
                                    [{'header': [1, 2, 3, false]}],
                                    ['bold', 'italic', 'underline'],
                                    [{'color': []}, {'background': []}],
                                    ['link', 'image'],
                                    [{'script': 'sub'}, {'script': 'super'}],
                                    [{'list': 'ordered'}, {'list': 'bullet'}],
                                    ['clean']
                                ]
                            }}
                            placeholder="Enter quiz instructions here..."
                        />
                    </div>
                    <div className="border rounded-bottom bg-light px-3 py-2 d-flex justify-content-end align-items-center text-muted small">
                        <div className="d-flex gap-3 align-items-center">
                            <span><FaRegKeyboard/></span>
                            |
                            <span>{wordCount} words</span>
                        </div>
                    </div>
                </div>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} htmlFor="wd-quiz-type" className="text-end">Quiz Type</Form.Label>
                    <Col sm={9}>
                        <Form.Select id="wd-quiz-type" defaultValue="GRADED_QUIZ">
                            <option value="GRADED_QUIZ">Graded Quiz</option>
                            <option value="PRACTICE_QUIZ">Practice Quiz</option>
                            <option value="GRADED_SURVEY">Graded Survey</option>
                            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} htmlFor="wd-group" className="text-end">Assignment Group</Form.Label>
                    <Col sm={9}>
                        <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-4">
                    <Form.Label column sm={3} htmlFor="wd-options" className="text-end">Additional Options</Form.Label>
                    <Col sm={9}>
                        <Card className="border">
                            <Card.Body>
                                <div className="mt-2">
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-shuffle"
                                        name="wd-shuffle_answers"
                                        label="Suffle Answers"
                                        className="mb-2"/>
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-time-limit"
                                        name="wd-time-limit"
                                        label="Time limit"
                                        className="mb-2"/>
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-multi-attempt"
                                        name="wd-multi-attempt"
                                        label="Allow Multiple Attempts"
                                        className="mb-2"/>
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
                                        id="wd-assign-to"
                                        type="text"
                                        defaultValue="Everyone"
                                        className="border border-dark"/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="wd-due-date"><strong>Due</strong></Form.Label>
                                    <Form.Control
                                        id="wd-due-date"
                                        type="datetime-local"
                                        defaultValue="2024-05-13T23:59"/>
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="wd-available-from"><strong>Available from</strong></Form.Label>
                                            <Form.Control
                                                id="wd-available-from"
                                                type="datetime-local"
                                                defaultValue="2024-05-06T12:00"/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="wd-available-until"><strong>Until</strong></Form.Label>
                                            <Form.Control
                                                id="wd-available-until"
                                                type="datetime-local"
                                                defaultValue="2024-05-20T23:59"
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
                            to={`/Kambaz/Courses/${cid}/Quizzes`}>
                        Cancel
                    </Button>
                    <Button variant="danger"
                            as={Link as any}
                            to={`/Kambaz/Courses/${cid}/Quizzes`}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}