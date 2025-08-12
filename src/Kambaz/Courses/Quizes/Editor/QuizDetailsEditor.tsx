import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FaRegKeyboard} from "react-icons/fa";
import {Card, Col, Form, Row} from 'react-bootstrap';
import './style.css';

interface QuizDetailsEditorRef {
    saveCurrentState: () => any;
}

interface Props {
    details: any;
}

const QuizDetailsEditor = forwardRef<QuizDetailsEditorRef, Props>(({ details }, ref) => {

    const [content, setContent] = useState(details.description || '');
    const [wordCount, setWordCount] = useState(0);
    const [title, setTitle] = useState(details.title || '');
    const [availableFrom, setAvailableFrom] = useState(
        details.dates?.availableFrom?.slice(0, 16) || ''
    );
    const [availableUntil, setAvailableUntil] = useState(
        details.dates?.availableUntil?.slice(0, 16) || ''
    );
    const [dueDate, setDueDate] = useState(
        details.dates?.dueDate?.slice(0, 16) || ''
    );
    const [quizType, setQuizType] = useState(details.quizType || 'GRADED_QUIZ');
    const [group, setGroup] = useState(details.group || 'ASSIGNMENTS');
    const [shuffleAnswers, setShuffleAnswers] = useState(details.options?.shuffleAnswers ?? false);
    const [assignTo, setAssignTo] = useState(details.assignTo ?? 'Everyone');
    const [attempts, setAttempts] = useState(details.options?.noOfAttempts ?? 1);
    const [timeLimit, setTimeLimit] = useState(details.options?.timeLimit ?? 20);
    const [accessCode, setAccessCode] =
  useState(details.options?.accessCode ?? "");
    const [questionLock, setQuestionLock] = useState(details.options?.lockEnabled ?? false);
    const [showAnswers, setShowAnswers] = useState(details.option?.showAnswers ?? null);

    useEffect(() => {
        setContent(details.description || '');
        setTitle(details.title || '');
        setAvailableFrom(details.dates?.availableFrom?.slice(0, 16) || '');
        setAvailableUntil(details.dates?.availableUntil?.slice(0, 16) || '');
        setDueDate(details.dates?.dueDate?.slice(0, 16) || '');
        setQuizType(details.quizType || 'GRADED_QUIZ');
        setGroup(details.group || 'ASSIGNMENTS');
        setShuffleAnswers(details.options?.shuffleAnswers ?? false);
        setTimeLimit(details.options?.timeLimit ?? false);
        setAssignTo(details.assignTo ?? 'Everyone');
        setAccessCode(details.options?.accessCode ?? "");
        setQuestionLock(details.options?.lockEnabled);
        setShowAnswers(details.options?.showAnswers);
    }, [details]);

    useImperativeHandle(ref, () => ({
        saveCurrentState: () => {

            return {
                ...details,
                title,
                description: content,
                dates: {
                    availableFrom: availableFrom || new Date().toISOString().slice(0, 16),
                    availableUntil: availableUntil || new Date().toISOString().slice(0, 16),
                    dueDate: dueDate || new Date().toISOString().slice(0, 16)
                },
                quizType,
                group,
                options: { shuffleAnswers: shuffleAnswers, timeLimit: timeLimit, noOfAttempts: attempts, questionLock: questionLock, showAnswers: showAnswers,
                      accessCode : accessCode,  
                },
                assignTo
            };
        }
    }));

    return (
        <div className="mb-4 p-3">
            <Form>
                <Form.Group className="mb-3 assignment_name">
                    <Form.Control
                        id="wd-name"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter quiz title..."
                    />
                </Form.Group>

                <div className="description_editor">
                    <label className="form-label fw-medium">Quiz Instructions:</label>
                    <div className="border rounded-top bg-light px-3 py-2">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex gap-3">
                                <button type="button" className="btn btn-link p-0 text-black text-decoration-none small">Edit</button>
                                <button type="button" className="btn btn-link p-0 text-black text-decoration-none small">View</button>
                                <button type="button" className="btn btn-link p-0 text-black text-decoration-none small">Insert</button>
                                <button type="button" className="btn btn-link p-0 text-black text-decoration-none small">Format</button>
                                <button type="button" className="btn btn-link p-0 text-black text-decoration-none small">Tools</button>
                                <button type="button" className="btn btn-link p-0 text-black text-decoration-none small">Table</button>
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
                    <Form.Label column sm={3} className="text-end">Additional Options</Form.Label>
                    <Col sm={9}>
                        <Card className="border">
                            <Card.Body>
                                <div className="mb-2 d-flex align-items-center">
                                    <Form.Label className="mb-0" style={{minWidth: '150px'}}>Shuffle
                                        Answers</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-shuffle"
                                        checked={shuffleAnswers}
                                        onChange={e => setShuffleAnswers(e.target.checked)}
                                        className="mb-0 ms-3"
                                    />
                                </div>
                                <div className="mb-2 d-flex align-items-center">
                                    <Form.Label className="mb-0" style={{minWidth: '150px'}}>Lock Questions</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        id="wd-question-lock"
                                        checked={questionLock}
                                        onChange={e => setQuestionLock(e.target.checked)}
                                        className="mb-0 ms-3"
                                    />
                                </div>
                                <div className="mb-2 d-flex align-items-center">
                                    <Form.Label htmlFor="wd-attempts" className="mb-0" style={{minWidth: '150px'}}>No of
                                        Attempts</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        id="wd-attempts"
                                        value={attempts}
                                        onChange={e => setAttempts(parseInt(e.target.value) || 1)}
                                        placeholder="1"
                                        style={{width: '80px'}}
                                        className="ms-3"
                                    />
                                </div>
                                <div className="mb-2 d-flex align-items-center">
                                    <Form.Label htmlFor="wd-time-limit" className="mb-0" style={{minWidth: '150px'}}>Time
                                        limit (minutes)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="10"
                                        id="wd-time-limit"
                                        value={timeLimit}
                                        onChange={e => setTimeLimit(parseInt(e.target.value) || 10)}
                                        placeholder="10"
                                        style={{width: '80px'}}
                                        className="ms-3"
                                    />
                                </div>
                                <div className="mb-2 d-flex align-items-center">
                                    <Form.Label htmlFor="wd-access-code" className="mb-0" style={{minWidth: '150px'}}>Access
                                        Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="wd-access-code"
                                        value={accessCode}
                                        onChange={e => setAccessCode(e.target.value)}
                                        placeholder="Enter access code"
                                        style={{width: '200px'}}
                                        className="ms-3"
                                    />
                                </div>
                                <div className="mb-2 d-flex align-items-center">
                                        <Form.Label htmlFor="wd-showAnswers" className="mb-0" style={{minWidth: '150px'}}>
                                            Show Answers
                                        </Form.Label>
                                        <Form.Control
                                            id="wd-available-until"
                                            type="datetime-local"
                                            value={showAnswers}
                                            style={{width: '200px'}}
                                            className="ms-3"
                                            onChange={e => setShowAnswers(e.target.value)}
                                        />
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
            </Form>
        </div>
    );
});

QuizDetailsEditor.displayName = 'QuizDetailsEditor';
export default QuizDetailsEditor;