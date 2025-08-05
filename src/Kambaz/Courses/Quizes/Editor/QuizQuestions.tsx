

import {useState} from "react";
import {Button} from "react-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
import QuestionEditor from "./QuestionEditor.tsx";
import type QuestionDetails from "../Interface/QuestionDetails";
import { useSelector, useDispatch } from "react-redux"; 

import { deleteQuestion } from "./reducer";             
// @ts-ignore

import { createNew } from '../client';
import { useNavigate, useParams } from 'react-router-dom';
import type EditQuiz from '../Interface/EditQuiz';

export default function QuizQuestions() {
    const dispatch = useDispatch();
    const navigate = useNavigate();  

    
 const details    = useSelector((state: any) => state.editorReducer.details);
  const questions  = useSelector((state: any) => state.editorReducer.questions as QuestionDetails[]);
  const newIds     = useSelector((state: any) => state.editorReducer.newQuestionIds)    as Set<string>;
  const updatedIds = useSelector((state: any) => state.editorReducer.updatedQuestionIds) as Set<string>;
  const deletedIds = useSelector((state: any) => state.editorReducer.deleteQuestionIds)  as Set<string>;


    const [currentScreen, setCurrentScreen] = useState('list'); // 'list' or 'edit'
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionDetails | null>(null);
    const { cid, qid } = useParams<{ cid: string; qid: string }>();
    const handleNewQuestion = () => {
        setSelectedQuestion(null);
        setCurrentScreen('edit');
    };

    const handleEditQuestion = (question: QuestionDetails): void => {
        console.log(question);
        setSelectedQuestion(question);
        setCurrentScreen('edit');
    };

    const handleCancel = () => {
        if(currentScreen === "edit") {
            setCurrentScreen('list');
        }
    };


    // for question editor .led back to list 
      const handleSave = () => {

        if (currentScreen === "edit") setCurrentScreen("list");
    };


            function buildPayload(): EditQuiz {
    return {
        quizId: qid ?? null,
        quizDetails: details,
        questions: {
        quizId: qid ?? null,
        deleteQuestionsIds: Array.from(deletedIds),
        updatedQuestions: questions.filter(q => updatedIds.has(q.questionId!)),
        newQuestions:     questions.filter(q => newIds.has(q.questionId!)),
        }
    };
    }
    // save all !!!!!!!!!! 
    const handleSaveAll = async () => 
        {
        setCurrentScreen('list');   
        const payload = buildPayload();  
        try {
            await createNew(payload, cid!);
            console.log('save succeed');
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        } catch(err) {
            console.error('save fail ', err);
        }
        };


          const handleDeleteQuestion = (index: number): void => {
        if (window.confirm("Are you sure you want to delete this question?")) {
        const q = questions[index];
        if (q.questionId) {
            dispatch(deleteQuestion(q.questionId));
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
                    <div className="d-flex justify-content-start">
                        <Button variant="secondary" className="me-2" onClick={handleCancel}>
                            Cancel
                        </Button>
                        
                        <Button variant="danger" onClick={handleSaveAll}>Save!!!!!!</Button>
                    </div>
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