import { MdBlock } from "react-icons/md";
import {useState} from "react";
import {IoEllipsisVertical} from "react-icons/io5";
import Nav from "react-bootstrap/Nav";
import QuizDetails from "./QuizDetails.tsx";
import QuizQuestions from "./QuizQuestions.tsx";
export default function QuizEditor() {
    const [points, setPoints] = useState(0);
    const [quizSate, setQuizSate] = useState('Not Published');
    const [selectedTab, setSelectedTab] = useState('Details');

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };

    return (
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
                {selectedTab === "Details" && <QuizDetails/>}
                {selectedTab === "Questions" && <QuizQuestions/>}
            </div>
        </div>

    );
}