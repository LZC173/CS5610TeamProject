

import {useState} from "react";
import {Button} from "react-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
import QuestionEditor from "./QuestionEditor.tsx";
import type QuestionDetails from "../Interface/QuestionDetails";
import { useSelector, useDispatch } from "react-redux"; 

import {changePoints, deleteQuestion} from "./reducer";
// @ts-ignore

import { createNew } from '../client';

export default function QuizQuestions() {
    const dispatch = useDispatch();


  const questions  = useSelector((state: any) => state.editorReducer.questions as QuestionDetails[]);

    const [currentScreen, setCurrentScreen] = useState('list'); // 'list' or 'edit'
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionDetails | null>(null);
    const handleNewQuestion = () => {
        setSelectedQuestion(null);
        setCurrentScreen('edit');
    };

    const handleEditQuestion = (question: QuestionDetails): void => {
        setSelectedQuestion(question);
        setCurrentScreen('edit');
    };


      const handleSave = () => {

        if (currentScreen === "edit") setCurrentScreen("list");
    };


      const handleDeleteQuestion = (index: number): void => {
        if (window.confirm("Are you sure you want to delete this question?")) {
        const q = questions[index];
        if (q.questionId) {
            dispatch(deleteQuestion(q.questionId));
            dispatch(changePoints(-1 * q.points))
        }
        }
    };

    return (
        <div className="mb-4 p-3">
            { currentScreen === "list" ? (
                <div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Button variant="secondary" style={{width: "30vw"}} onClick={handleNewQuestion}> + New
                            Question</Button>
                    </div>
                    <br/>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th className="py-3">Q.No</th>
                            <th className="py-3">Title</th>
                            <th className="py-3">Type</th>
                            <th className="py-3">Points</th>
                            <th className="py-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {questions.map((question: any, index: number) => (
                            <tr key={question.questionId}>
                                <td className="py-3">Q{index + 1}</td>
                                <td className="py-3">{question.questionTitle}</td>
                                <td className="py-3">{question.questionType}</td>
                                <td className="py-3">{question.points}</td>
                                <td className="py-3">
                                    <MdModeEdit
                                        style={{cursor: 'pointer'}}
                                        className="text-primary me-3"
                                        onClick={() => handleEditQuestion(question)}
                                    />
                                    <MdDelete
                                        style={{cursor: 'pointer'}}
                                        className="text-danger"
                                        onClick={() => handleDeleteQuestion(index)}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <hr/>
                </div>

            ) : (
                  <QuestionEditor
                question={selectedQuestion}
                onSave={handleSave}             
                />
            )}

        </div>
    );
}