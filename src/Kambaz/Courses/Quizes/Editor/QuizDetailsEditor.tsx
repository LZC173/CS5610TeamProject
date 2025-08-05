import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaRegKeyboard } from "react-icons/fa";
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import './style.css';
import {Link} from "react-router-dom";


import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setDetails } from './reducer';  


// 
import { createNew } from '../client';
// @ts-ignore
export default function QuizDetailsEditor({details}) {
      const { cid, qid } = useParams<{ cid: string; qid: string }>();
        const dispatch = useDispatch();
        const navigate = useNavigate();

    const [content, setContent] = useState(details.description);
    const [wordCount, setWordCount] = useState(0);
    function formatDateForInput(isoDate: string | undefined): string {
    if (!isoDate) return "";
    return new Date(isoDate).toISOString().slice(0, 16);
    }
    const [title, setTitle] = useState(details.title);
    const [availableFrom, setAvailableFrom] = useState(details.dates.availableFrom.slice(0,16));
    const [availableUntil, setAvailableUntil] = useState(details.dates.availableUntil.slice(0,16));
    const [dueDate, setDueDate] = useState(details.dates.dueDate.slice(0,16));
    const [quizType, setQuizType] = useState('GRADED_QUIZ');
    const [group, setGroup] = useState('ASSIGNMENTS');
    const [shuffleAnswers, setShuffleAnswers] = useState(details.options?.shuffleAnswers ?? false);
    const [timeLimit,    setTimeLimit]    = useState(details.options?.timeLimit       ?? false);
    const [multiAttempt, setMultiAttempt] = useState(details.options?.multiAttempt    ?? false);
    const [assignTo, setAssignTo] = useState(details.assignTo ?? 'Everyone');



    
      const handleSave = async () => {
    const updated = {
      ...details,
      title,
      description: content,
      dates: { availableFrom, availableUntil, dueDate },
      quizType,
      group,
      options: { shuffleAnswers, timeLimit, multiAttempt },
      assignTo
    };
        // dispatch to redux
    dispatch(setDetails(updated));
    // 2) 
    try {
      await createNew(
        { quizId: qid ?? null, quizDetails: updated, questions: { deleteQuestionsIds: [], updatedQuestions: [], newQuestions: [] } },
        cid!
      );
    } catch (err) {
      console.error('not send to backend ', err);
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

    return (
        <div className="mb-4 p-3">
            <Form>
                <Form.Group className="mb-3 assignment_name">
                    <Form.Control
                        id="wd-name"
                        type="text"
                        value={title}                          
                        onChange={e => setTitle(e.target.value)}  
                />
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
                             onChange={value => {
                                setContent(value);                             
                                    setWordCount(value.split(/\s+/).filter(Boolean).length);
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
                         <Form.Select
                        id="wd-quiz-type"
                        value={quizType}
                        onChange={e => setQuizType(e.target.value)}
                        >
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
                         <Form.Select
                           id="wd-group"
                          value={group}
                           onChange={e => setGroup(e.target.value)}
                         >
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Form.Group>


        <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} htmlFor="wd-options" className="text-end">
                Additional Options
            </Form.Label>
            <Col sm={9}>
                <Card className="border">
                <Card.Body>
                    <div className="mt-2">
                    <Form.Check
                        type="checkbox"
                        id="wd-shuffle"
                        label="Shuffle Answers"
                        checked={shuffleAnswers}
                        onChange={e => setShuffleAnswers(e.target.checked)}
                        className="mb-2"
                    />
                    <Form.Check
                        type="checkbox"
                        id="wd-time-limit"
                        label="Time limit"
                        checked={timeLimit}
                        onChange={e => setTimeLimit(e.target.checked)}
                        className="mb-2"
                    />
                    <Form.Check
                        type="checkbox"
                        id="wd-multi-attempt"
                        label="Allow Multiple Attempts"
                        checked={multiAttempt}
                        onChange={e => setMultiAttempt(e.target.checked)}
                        className="mb-2"
                    />
                    </div>
                </Card.Body>
                </Card>
            </Col>
            </Form.Group>

        <Form.Group as={Row} className="mb-4">
            <Form.Label column sm={3} className="text-end">
                Assign
            </Form.Label>
            <Col sm={9}>
                <Card className="border">
                <Card.Body>
                    {/* Assign to */}
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-assign-to">
                        <strong>Assign to</strong>
                    </Form.Label>
                    <Form.Control
                        id="wd-assign-to"
                        type="text"
                        value={assignTo}
                        onChange={e => setAssignTo(e.target.value)}
                        className="border border-dark"
                    />
                    </Form.Group>

                    {/* Due */}
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="wd-due-date">
                        <strong>Due</strong>
                    </Form.Label>
                    <Form.Control
                        id="wd-due-date"
                        type="datetime-local"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                    />
                    </Form.Group>

                    <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label htmlFor="wd-available-from">
                            <strong>Available from</strong>
                        </Form.Label>
                        <Form.Control
                            id="wd-available-from"
                            type="datetime-local"
                            value={availableFrom}
                            onChange={e => setAvailableFrom(e.target.value)}
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label htmlFor="wd-available-until">
                            <strong>Until</strong>
                        </Form.Label>
                        <Form.Control
                            id="wd-available-until"
                            type="datetime-local"
                            value={availableUntil}
                            onChange={e => setAvailableUntil(e.target.value)}
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
                    <Button variant="danger" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}