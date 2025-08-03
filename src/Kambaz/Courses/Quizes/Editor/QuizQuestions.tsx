import {useState} from "react";
import {Button} from "react-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
import QuestionEditor from "./QuestionEditor.tsx";

// @ts-ignore
export default function QuizQuestions({questionsList}) {

    const [questions, setQuestions] = useState(questionsList)
    const [currentScreen, setCurrentScreen] = useState('list'); // 'list' or 'edit'
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleNewQuestion = () => {
        setSelectedQuestion(null);
        setCurrentScreen('edit');
    };

    const handleEditQuestion = (question) => {
        console.log(question)
        setSelectedQuestion(question);
        setCurrentScreen('edit');
    };

    const handleCancel = () => {
        if(currentScreen === "edit") {
            setCurrentScreen('list');
        }
    };

    const handleSave = () => {
        if(currentScreen === "edit") {
            setCurrentScreen('list');
        }
    };

    const handleDeleteQuestion = (index: number) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            setQuestions(questions.filter((_, i) => i !== index));
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
                    <div className="d-flex justify-content-start">
                        <Button variant="secondary" className="me-2" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>

            ) : (
                <QuestionEditor question={selectedQuestion}/>
            )}

        </div>
    );
}