import { useState, useEffect } from 'react';
import type QuestionDetails from "../Interface/QuestionDetails";
import ReactQuill from "react-quill";
import {FaRegKeyboard} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";

interface Props {
    question: QuestionDetails | null;
}

export default function QuestionEditor({ question }: Props) {
    const [questionType, setQuestionType] = useState('multi-select');
    const [points, setPoints] = useState(4);
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState(['', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const dispatch = useDispatch();

    

    useEffect(() => {
        if (question) {
            setQuestionType(question.questionType);
            setPoints(question.points);
            setQuestionText(question.questionDescription);
            setAnswers(question.possibleAnswers.length > 0 ? question.possibleAnswers : ['', '']);
            setCorrectAnswer(question.correctAnswers);
            setWordCount(question.questionDescription.length);
            console.log(question.possibleAnswers)
        } else {
            setQuestionType('multi-select');
            setPoints(4);
            setQuestionText('');
            setAnswers(['', '']);
            setCorrectAnswer('');
            setWordCount(0);
        }
    }, [question]);

    const handleQuestionTypeChange = (type: string) => {
        console.log("triggered")
        setQuestionType(type);
        setCorrectAnswer('');

        if (type === 'multi-select') {
            setAnswers(['', '']);
        } else if (type === 'true-false') {
            setAnswers(['True', 'False']);
        } else if (type === 'fill-in-blank') {
            setAnswers([]);
        }
    };

    const addAnswerOption = () => {
        if (questionType === 'multi-select' && answers.length < 6) {
            setAnswers([...answers, '']);
        }
    };

    const removeAnswerOption = (index: number) => {
        if (questionType === 'multi-select' && answers.length > 2) {
            const newAnswers = answers.filter((_, i) => i !== index);
            setAnswers(newAnswers);
            // Clear correct answer if it was the removed option
            if (correctAnswer === answers[index]) {
                setCorrectAnswer('');
            }
        }
    };

    const updateAnswerOption = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (value: string) => {
        setCorrectAnswer(value);
    };

    return (
        <div className="container-fluid p-4">

            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <select
                            className="form-select me-3"
                            value={questionType}
                            onChange={(e) => handleQuestionTypeChange(e.target.value)}
                            style={{width: '20vw'}}>
                            <option value="multi-select">Multi Select</option>
                            <option value="true-false">True/False</option>
                            <option value="fill-in-blank">Fill in the Blank</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">pts:</span>
                        <input
                            type="number"
                            className="form-control"
                            value={points}
                            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                            style={{width: '80px'}}
                            min="0"/>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="row mb-3">
                <div className="col-12">
                    <p className="text-muted small mb-3">
                        Enter your question and multiple answers, then select the one correct answer.
                    </p>
                </div>
            </div>

            <div className="description_editor">
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
                        value={questionText}
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
                <div
                    className="border rounded-bottom bg-light px-3 py-2 d-flex justify-content-end align-items-center text-muted small">
                    <div className="d-flex gap-3 align-items-center">
                        <span><FaRegKeyboard/></span>
                        |
                        <span>{wordCount} words</span>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <label className="form-label fw-bold">Answers:</label>

                    {questionType === 'multi-select' && (
                        <div>
                            {answers.map((answer, index) => (
                                <div key={index} className="d-flex align-items-center mb-3">
                                    <div className="form-check me-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="correctAnswer"
                                            value={answer}
                                            checked={correctAnswer === answer}
                                            onChange={(e) => handleCorrectAnswerChange(e.target.value)}
                                        />
                                        <label className="form-check-label text-success">
                                            {(correctAnswer === answer && correctAnswer !== "") ? 'Correct Answer' : 'Possible Answer'}
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={answer}
                                        onChange={(e) => updateAnswerOption(index, e.target.value)}
                                        placeholder={`Answer option ${index + 1}`}
                                    />
                                    {answers.length > 2 && (
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeAnswerOption(index)}
                                        >
                                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path
                                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}

                            {answers.length < 6 && (
                                <div className="mb-3">
                                    <button
                                        className="btn btn-link text-danger p-0"
                                        onClick={addAnswerOption}
                                    >
                                        + Add Another Answer
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {questionType === 'true-false' && (
                        <div>
                            {answers.map((answer, index) => (
                                <div key={index} className="d-flex align-items-center mb-3">
                                    <div className="form-check me-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="correctAnswer"
                                            value={answer}
                                            checked={correctAnswer === answer}
                                            onChange={(e) => handleCorrectAnswerChange(e.target.value)}
                                        />
                                        <label className="form-check-label text-success">
                                            {correctAnswer === answer ? 'Correct Answer' : 'Possible Answer'}
                                        </label>
                                    </div>
                                    <span className="form-control-plaintext fw-semibold">
                                        {answer}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {questionType === 'fill-in-blank' && (
                        <div className="alert alert-secondary">
                            <div className="mb-3">
                                <label className="form-label text-dark">Expected Answer:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    placeholder="Enter the correct answer..."
                                    style={{width: '300px'}}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <hr/>
            <div className="d-flex justify-content-start">
                <Button variant="secondary" className="me-2" >
                    Cancel
                </Button>
                <Button variant="danger" >
                    Save
                </Button>
            </div>
        </div>
    );
}