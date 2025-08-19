import { useState, useEffect } from 'react';
import type QuestionDetails from "../Interface/QuestionDetails";
import ReactQuill from "react-quill";
import {FaRegKeyboard} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";

import {addQuestion, changePoints, updateQuestion} from "./reducer";

interface Props {
    question: QuestionDetails | null;
    onSave: () => void;
}

export default function QuestionEditor({ question, onSave }: Props) {
    const [questionType, setQuestionType] = useState('multi-select');
    const [points, setPoints] = useState(4);
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState(['']);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
    const [wordCount, setWordCount] = useState(0);
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    const [initialPoints, setInitialPoints] = useState(0);

    useEffect(() => {
        if (question) {
            setQuestionType(question.questionType);
            setPoints(question.points);
            setTitle(question.questionTitle)
            setQuestionText(question.questionDescription);
            setAnswers(question.possibleAnswers.length > 0 ? question.possibleAnswers : ['']);

            if (Array.isArray(question.correctAnswers)) {
                setCorrectAnswers(question.correctAnswers);
            } else {
                setCorrectAnswers(question.correctAnswers ? [question.correctAnswers] : []);
            }

            setWordCount(question.questionDescription.length);
            setInitialPoints(question.points);
        } else {
            setQuestionType('multi-select');
            setPoints(4);
            setQuestionText('');
            setAnswers(['']);
            setCorrectAnswers([]);
            setWordCount(0);
        }
    }, [question]);

    const handleQuestionTypeChange = (type: string) => {
        setQuestionType(type);
        setCorrectAnswers([]);

        if (type === 'multi-select') {
            setAnswers(['']);
        } else if (type === 'true-false') {
            setAnswers(['True', 'False']);
        } else if (type === 'fill-in-blank') {
            setAnswers([]);
            setCorrectAnswers(['']);
        }
    };

    const addAnswerOption = () => {
        if (questionType === 'multi-select') {
            setAnswers([...answers, '']);
        }
    };

    const removeAnswerOption = (index: number) => {
        if (questionType === 'multi-select' && answers.length > 1) {
            const newAnswers = answers.filter((_, i) => i !== index);
            setAnswers(newAnswers);
            const removedAnswer = answers[index];
            setCorrectAnswers(correctAnswers.filter(answer => answer !== removedAnswer));
        }
    };

    const updateAnswerOption = (index: number, value: string) => {
        const newAnswers = [...answers];
        const oldValue = newAnswers[index];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        if (correctAnswers.includes(oldValue)) {
            const updatedCorrectAnswers = correctAnswers.map(answer =>
                answer === oldValue ? value : answer
            );
            setCorrectAnswers(updatedCorrectAnswers);
        }
    };

    const handleCorrectAnswerToggle = (value: string) => {
        if (questionType === 'multi-select') {
            if (correctAnswers.includes(value)) {
                setCorrectAnswers(correctAnswers.filter(answer => answer !== value));
            } else {
                setCorrectAnswers([...correctAnswers, value]);
            }
        } else {
            setCorrectAnswers([value]);
        }
    };

    const addCorrectAnswer = () => {
        if (questionType === 'fill-in-blank') {
            setCorrectAnswers([...correctAnswers, '']);
        }
    };

    const removeCorrectAnswer = (index: number) => {
        if (questionType === 'fill-in-blank' && correctAnswers.length > 1) {
            const newAnswers = correctAnswers.filter((_, i) => i !== index);
            setCorrectAnswers(newAnswers);
        }
    };

    const updateCorrectAnswer = (index: number, value: string) => {
        if (questionType === 'fill-in-blank') {
            const newAnswers = [...correctAnswers];
            newAnswers[index] = value;
            setCorrectAnswers(newAnswers);
        }
    };

    const errorValidation = (field :string, value : any) => {
        let valid = true;
        let message = ""    
        switch(field) {
                case "title":
                    if(value === null || value === "") {
                        message = "Title cannot be empty."
                        valid = false;
                    }
                    break;
                case "description":
                        if(value === null || value === "") {
                        message = "Description cannot be empty."
                        valid = false;
                    }
                    break;
                case "answers":
                    if(questionType !== 'fill-in-blank' && (value === null || value.length === 0 )) {
                        message = "Provide one or more possible answers."
                        valid = false;
                        break;
                    }  
                   if(questionType !== 'fill-in-blank' ) {
                    for (const element of value) {
                        if (element === null || element === "") {
                            valid = false;
                            message = "Cannot have empty options for answers. Please provide value";
                            break;
                        }
                        }
                   }
                    break;
                case "correctAnswers":
                    if(value === null || value.length === 0 ) {
                        message = "Provide one or more possible correct answers."
                        valid = false;
                    }    
                  for (const element of value) {
                    if (element === null || element === "") {
                        valid = false;
                        message = "Cannot have empty options for correct answers. Please provide value";
                        break;
                    }
                    }
                    break;
                default:
                    break;    
            }

            if(!valid) {
                alert(message);
            }
        return valid;    
        }


        const saveQuestionDetails = () => {
                        let finalCorrectAnswers = correctAnswers;
                        if (questionType === 'fill-in-blank') {
                            finalCorrectAnswers = correctAnswers.filter(answer => answer.trim() !== '');
                        }
                        
                        let valid =  true;
                        valid = errorValidation("title", title) && errorValidation("description", questionText) && errorValidation("answers", answers) && errorValidation("correctAnswers",finalCorrectAnswers )
                        if(!valid){
                            return;
                        }

                        const payload: QuestionDetails = {
                            questionId: question?.questionId,
                            questionTitle: title,
                            questionDescription: questionText,
                            questionType: questionType,
                            possibleAnswers: questionType === 'fill-in-blank' ? [] : answers,
                            correctAnswers: finalCorrectAnswers,
                            points: points
                        };

                        if (question && question.questionId) {
                            dispatch(updateQuestion(payload));
                            dispatch(changePoints(payload.points - initialPoints))
                        } else {
                            dispatch(addQuestion(payload));
                            dispatch(changePoints(payload.points))
                        }
                        onSave();
                    }

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
                            style={{width: '5vw'}}
                            min="0"/>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <p className="text-muted small mb-3">
                        {questionType === 'multi-select'
                            ? 'Enter your question and multiple answers, then select all correct answers.'
                            : questionType === 'fill-in-blank'
                                ? 'Enter your question and provide multiple expected answers for fill-in-the-blank fields.'
                                : 'Enter your question and select the correct answer.'
                        }
                        <input
                            type="text"
                            className="form-control me-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter question title here"
                        />
                    </p>
                </div>
            </div>

            <div className="description_editor">
                <label className="form-label fw-medium">Question Instructions:</label>
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
                        onChange={(value) => {
                            setQuestionText(value)
                            setWordCount(value.split(/\s+/).length)
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
                                            type="checkbox"
                                            value={answer}
                                            checked={correctAnswers.includes(answer) && answer !== ''}
                                            onChange={() => handleCorrectAnswerToggle(answer)}
                                            disabled={answer === ''}
                                        />
                                        <label className="form-check-label text-success">
                                            {correctAnswers.includes(answer) && answer !== '' ? 'Correct Answer' : 'Possible Answer'}
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={answer}
                                        onChange={(e) => updateAnswerOption(index, e.target.value)}
                                        placeholder={`Answer option ${index + 1}`}
                                    />
                                    {answers.length > 1 && (
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
                            <div className="mb-3">
                                    <button
                                        className="btn btn-link text-danger p-0"
                                        onClick={addAnswerOption}
                                    >
                                        + Add Another Answer
                                    </button>
                                </div>

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
                                            checked={correctAnswers.includes(answer)}
                                            onChange={() => handleCorrectAnswerToggle(answer)}
                                        />
                                        <label className="form-check-label text-success">
                                            {correctAnswers.includes(answer) ? 'Correct Answer' : 'Possible Answer'}
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
                                {correctAnswers.map((answer, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2">
                                        <input
                                            type="text"
                                            className="form-control me-2"
                                            value={answer}
                                            onChange={(e) => updateCorrectAnswer(index, e.target.value)}
                                            placeholder={`Answer ${index + 1}`}
                                            style={{width: '20vw'}}
                                        />
                                        {correctAnswers.length > 1 && (
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => removeCorrectAnswer(index)}
                                            >
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    className="btn btn-link p-0 small"
                                    onClick={addCorrectAnswer}
                                >
                                        + Add Answer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <hr/>
            <div className="d-flex justify-content-start">
                <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => onSave()}
                >
                    Cancel
                </Button>


                <Button
                    variant="danger"
                    onClick={saveQuestionDetails}
                >
                    SaveQuestion
                </Button>
            </div>
        </div>
    );
}