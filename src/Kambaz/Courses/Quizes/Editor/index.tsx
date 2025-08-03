import { MdBlock } from "react-icons/md";
import {useEffect, useState} from "react";
import {IoEllipsisVertical} from "react-icons/io5";
import Nav from "react-bootstrap/Nav";
import QuizDetailsEditor from "./QuizDetailsEditor.tsx";
import QuizQuestions from "./QuizQuestions.tsx";
import * as quizClient from "../client.ts";
import {useParams} from "react-router-dom";

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

                <div className="container-fluid">
                    {selectedTab === "Details" && <QuizDetailsEditor details={quiz.details}/>}
                    {selectedTab === "Questions" && <QuizQuestions questionsList={quiz.questions}/>}
                </div>
            </div>
        )
    );
}