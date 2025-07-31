import {Button, Col, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import {FaSearch} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";
import {IoEllipsisVertical} from "react-icons/io5";
import * as db from './mock.ts';
import {MdArrowDropDown} from "react-icons/md";
import {useParams} from "react-router";
import { GoRocket } from "react-icons/go";
import QuizControls from "./QuizControls.tsx";

export default function Quizes() {

    const quizzes = db.quizzes;
    const { cid } = useParams();
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = hours === 0 && minutes === 0 ? "12:00am" :
            hours === 23 && minutes === 59 ? "11:59pm" :
                date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).toLowerCase();

        return `${month} ${day} at ${time}`;
    };

    return (
        <div>
            <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center mb-4">
                <div style={{width: "300px"}}>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch/>
                        </InputGroup.Text>
                        <Form.Control
                            id="wd-search-assignment"
                            placeholder="Search for Quizes"
                            type="text"
                        />
                    </InputGroup>
                </div>

                <div>
                    <Button
                        id="wd-add-assignment-group"
                        variant="danger"
                        size={'sm'}
                        className="me-2">
                        <FaPlus className="me-2"/>
                        Quiz
                    </Button>
                    <button className="btn btn-light border rounded p-1">
                        <IoEllipsisVertical id="wd-assignemnt-controls" className="fs-5"/>
                    </button>
                </div>
            </div>

            <ListGroup className="rounded-0" id="wd-quizes">
                <ListGroup.Item className="wd-quizes p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <MdArrowDropDown className="fs-3" />
                        Quizzes
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        {quizzes.map((quiz: any) => (
                            <ListGroup.Item className="wd-lesson p-3 ps-1">
                                <Row className="align-items-center">
                                    <Col sm={1} className="d-flex justify-content-center">
                                        <GoRocket className="text-success bg-white" size={24}/>
                                    </Col>
                                    <Col sm={9} className="d-flex">
                                        <div className="d-flex flex-column">
                                            <a href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz.quiz_id}`}>
                                                {quiz.title}
                                            </a>
                                            <div className="wd-assignment-details">
                                                <strong>Not available until {formatDate(quiz.available_date_time)}</strong>
                                                Quiz logic
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={2} className="d-flex justify-content-center">
                                        <QuizControls/>
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