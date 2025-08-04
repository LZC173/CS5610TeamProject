import { MdBlock } from "react-icons/md";
import {useEffect, useState} from "react";
import {IoEllipsisVertical} from "react-icons/io5";
import Nav from "react-bootstrap/Nav";
import QuizDetailsEditor from "./QuizDetailsEditor.tsx";
import QuizQuestions from "./QuizQuestions.tsx";
import * as quizClient from "../client.ts";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function QuizEditor() {
    const [points, setPoints] = useState(0);
    const [quizSate, setQuizSate] = useState('Not Published');
    const [selectedTab, setSelectedTab] = useState('Details');
    const [loaded, setLoaded] = useState(false);
    const { cid, qid } = useParams<{ cid: string,qid: string }>();
    const [quiz, setQuiz] = useState({
        courseId: cid as string,
        details: {
            dates: {
                availableFrom: new Date().toDateString(),
                availableUntil: new Date().toDateString(),
                dueDate: new Date().toDateString()
            },
            points: 0,
            noOfQuestions: 0,
            description: "",
            title: ""
        },
        questions: []
    });
    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };

    const newQuiz = {
        quizId: null,
        quizDetails: {
            title: "New Quiz",
            description : "New Description",
            dates:{
                availableFrom: new Date().toDateString(),
                availableUntil: new Date().toDateString(),
                dueDate: new Date().toDateString()
            },
            multipleAttempts: true,
            numberOfAttempts: 3
        },
        questions: {
            deleteQuestionsIds: null,
            updatedQuestions: null,
            newQuestions: [
                {
                    questionId: "mc_001",
                    questionTitle: "Photosynthesis Process",
                    questionDescription: "Which of the following best describes the process by which plants convert sunlight into energy?",
                    questionType: "multi-select",
                    possibleAnswers: [
                        "To produce oxygen for animals",
                        "To convert sunlight into chemical energy",
                        "To absorb carbon dioxide from air",
                        "To create chlorophyll"
                    ],
                    correctAnswers: "To convert sunlight into chemical energy",
                    points: 2
                },
                {
                    questionId: "tf_001",
                    questionTitle: "JavaScript Variable Declaration",
                    questionDescription: "True or False: In JavaScript, variables declared with 'const' can be reassigned after declaration.",
                    questionType: "true-false",
                    possibleAnswers: [
                        "True",
                        "False"
                    ],
                    correctAnswers: "False",
                    points: 1
                }
            ]
        }
    }

    const editQuiz = {
        quizId: "q1-html",
        quizDetails: {
            title: "Q1 - HTML",
            description : "New Description",
            dates:{
                availableFrom: new Date().toDateString(),
                availableUntil: new Date().toDateString(),
                dueDate: new Date().toDateString()
            },
            multipleAttempts: true,
            numberOfAttempts: 3
        },
        questions: {
            deleteQuestionsIds: ["mc_001"],
            updatedQuestions: [
                {
                    questionId: "tf_001",
                    questionTitle: "JavaScript Variable Declaration",
                    questionDescription: "True or False: In JavaScript, variables declared with 'const' can be reassigned after declaration.",
                    questionType: "multi-select",
                    possibleAnswers: [
                        "To produce oxygen for animals",
                        "To convert sunlight into chemical energy",
                        "To absorb carbon dioxide from air",
                        "To create chlorophyll"
                    ],
                    correctAnswers: "To convert sunlight into chemical energy",
                    points: 1
                }
            ],
            newQuestions: [
                {
                    questionId: "tf_002",
                    questionTitle: "JavaScript Variable Declaration",
                    questionDescription: "True or False: In JavaScript, variables declared with 'const' can be reassigned after declaration.",
                    questionType: "true-false",
                    possibleAnswers: [
                        "True",
                        "False"
                    ],
                    correctAnswers: "False",
                    points: 1
                }
            ]
        }
    }

    const saveHandler = async(quiz: any, cid: string) => {
        const response = await quizClient.createNew(quiz, cid);
        console.log(response);
    }


    const fetchDetails = async (quizId : string) => {
        const quizDetails = await quizClient.fetchDetails(quizId);
        setQuiz(quizDetails)
        setPoints(quizDetails.details.points)
        setLoaded(true);
    }
    useEffect(() => {
       if (qid === null || qid === undefined) {

       }
       else {
           fetchDetails(qid);
       }
    }, [qid])

    return (
        loaded && (
            <div>
                <div className="container-fluid p-3">
                    <div className="d-flex justify-content-end align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="me-4 fw-bold">Points {points}</span>
                            <span className="me-4 text-muted">
                        <MdBlock/> {quizSate}
                    </span>
                            <button className="btn btn-light border rounded p-1">
                                <IoEllipsisVertical id="wd-assignemnt-controls" className="fs-5"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="wd-css-navigating-with-tabs">
                    <Nav variant="tabs">
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => {
                                    handleTabClick("Details")
                                }}
                                active={selectedTab === "Details"}
                                className={selectedTab !== "Details" ? "text-danger" : ""}>
                                Details
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => {
                                    handleTabClick("Questions")
                                }}
                                active={selectedTab === "Questions"}
                                className={selectedTab !== "Questions" ? "text-danger" : ""}>
                                Questions
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <Button onClick={()=> {saveHandler(newQuiz, cid as string)}}> Save New Quiz</Button>
                <Button onClick={()=> {saveHandler(editQuiz, cid as string)}}> Edit Quiz</Button>

                <div className="container-fluid">
                    {selectedTab === "Details" && <QuizDetailsEditor details={quiz.details}/>}
                    {selectedTab === "Questions" && <QuizQuestions questionsList={quiz.questions}/>}
                </div>
            </div>
        )
    );
}