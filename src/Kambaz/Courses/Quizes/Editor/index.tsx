import { MdBlock } from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import {IoEllipsisVertical} from "react-icons/io5";
import Nav from "react-bootstrap/Nav";
import QuizDetailsEditor from "./QuizDetailsEditor.tsx";
import QuizQuestions from "./QuizQuestions.tsx";
import * as quizClient from "../client.ts";
import {useParams, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { clearData, setDetails, setPoints, setQuestions} from "./reducer.ts";
import {FaCheckCircle} from "react-icons/fa";

export default function QuizEditor() {
     const navigate = useNavigate();
    const [quizSate, setQuizSate] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Details');
    const [loaded, setLoaded] = useState(false);
    const { cid, qid } = useParams<{ cid: string,qid: string }>();

    const handleTabClick = (tabName: string) => {
        if (selectedTab === 'Details' && detailsEditorRef.current) {
            const data = detailsEditorRef.current.saveCurrentState()
            dispatch(setDetails(data))
        }
        setSelectedTab(tabName)
    };
    const details    = useSelector((state: any) => state.editorReducer.details);
    const questions  = useSelector((state: any) => state.editorReducer.questions);
     const newIds     = useSelector((s: any) => s.editorReducer.newQuestionIds)     as string[];
 const updatedIds = useSelector((s: any) => s.editorReducer.updatedQuestionIds) as string[];
 const deletedIds = useSelector((s: any) => s.editorReducer.deleteQuestionIds)  as string[];
    const points     = useSelector((state: any)=> state.editorReducer.points);
    const detailsEditorRef = useRef<{ saveCurrentState: () => any }>(null);


    const dispatch = useDispatch();

    const fetchDetails = async (quizId : string) => {
        const quizDetails = await quizClient.fetchDetails(quizId);
        setQuizSate(quizDetails.published);
        dispatch(setDetails(quizDetails.details))
        dispatch(setQuestions(quizDetails.questions));
        dispatch(setPoints(quizDetails.points))
        setLoaded(true);
    }
    useEffect(() => {
       dispatch(clearData())
        if (qid === null || qid === undefined) {
           setLoaded(true);
       }
       else {
           fetchDetails(qid);
       }
    }, [qid])

    const saveQuiz = async (status: boolean, goToDetails: boolean) => {
        console.log("save here")
        try {
        const newIdsSet = new Set(newIds);
        const updatedIdsSet = new Set(updatedIds);
        const data = selectedTab === "Details" &&
      detailsEditorRef.current &&
      typeof detailsEditorRef.current.saveCurrentState === "function"
        ? detailsEditorRef.current.saveCurrentState()
        : details;
    dispatch(setDetails(data));
    const requestBody = {
      quizId: qid || null,
      published: status,
      quizDetails: data,
      questions: {
        quizId: qid || null,
        deleteQuestionsIds: deletedIds,
        updatedQuestions: questions.filter((q: { questionId: string }) =>
          updatedIdsSet.has(q.questionId)
        ),
        newQuestions: questions.filter((q: { questionId: string }) =>
          newIdsSet.has(q.questionId)
        ),
      },
    };

    console.log(requestBody)
    await quizClient.createNew(requestBody, cid as string);

    if (goToDetails) {
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/details`);
    } else {
      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    }

  } catch (e) {
      console.log(e)
    alert("Save failed");
  }
};

    return (
        loaded && (
            <div>
                <div className="container-fluid p-3">
                    <div className="d-flex justify-content-end align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="me-4 fw-bold">Points : {points}</span>
                            <span className="me-4 text-muted">
                                {quizSate ? <>
                                    <FaCheckCircle className="text-success me-2" />
                                    <span>Published</span>
                                </> : <>
                                    <MdBlock/>
                                    <span> Not Published</span>
                                </>}
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
                    {selectedTab === "Details" && <QuizDetailsEditor details={details} ref={detailsEditorRef}/>}
                    {selectedTab === "Questions" && <QuizQuestions/>}
                </div>
                <div className="container-fluid p-3">
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
                            Cancel
                        </Button>
                        <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => saveQuiz(quizSate, true)} //
                        >
                        Save
                        </Button>

                        <Button
                        variant="primary"
                        onClick={() => saveQuiz(true, false)} // 
                        >
                        Save and Publish
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}