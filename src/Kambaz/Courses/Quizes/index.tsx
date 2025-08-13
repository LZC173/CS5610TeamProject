import {useEffect, useState} from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { GoRocket } from "react-icons/go";
import { FaCaretDown, FaTrash } from "react-icons/fa";

import QuizzesControls from "./QuizzesControls.tsx";
import QuizItemButtons from "./QuizItemButtons.tsx";
import {deleteQuiz, setQuizzes} from "./reducer.ts";

import type {QuizzesState} from "./reducer.ts";
import * as quizzesClient from "./client.ts";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const canEdit = currentUser.role === "FACULTY";
    const navigate = useNavigate(); 
  const { cid } = useParams<{ cid: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const {quizzes} = useSelector((state: any) => state.quizzesReducer) as QuizzesState;
    const [choiceModal, setChoiceModal] = useState<{
    show: boolean;
    quizId: string | null;
    allowed: number;
    used: number;
  }>({ show: false, quizId: null, allowed: 0, used: 0 });


  const filtered = quizzes
    .filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await quizzesClient.deleteQuiz(id);
      dispatch(deleteQuiz(id));
    }
  };

  const fetchQuizzes = async (courseId: string) => {
    const quizzes = await quizzesClient.fetchQuizzes(courseId as string);
    console.log(quizzes);
    dispatch(setQuizzes(quizzes))
  }

  useEffect(() => {
    fetchQuizzes(cid as string);
  }, []);



  //
    //handle quiz 
const handleEnterQuiz = async (quizId: string) => {
  // 1) eget access code 
  const detail = await quizzesClient.fetchDetails(quizId);
  const allowedAttempts: number = detail?.details?.options?.noOfAttempts ?? 1;


  // 2)get attept 
  const attempt = await quizzesClient.getAttemptDetails(quizId);
  const usedAttempts: number = attempt?.noOfAttempts ?? 0;

  // 
  if (usedAttempts >= allowedAttempts) {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/result`);
    return;
  }
  setChoiceModal({
      show: true,
      quizId,
      allowed: allowedAttempts,
      used: usedAttempts,
    });
};

//got 
  const goToResult = () => {
    if (!choiceModal.quizId) return;
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${choiceModal.quizId}/result`);
    setChoiceModal({ show: false, quizId: null, allowed: 0, used: 0 });
  };

  const goToTake = () => {
    if (!choiceModal.quizId) return;
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${choiceModal.quizId}/take`);
    setChoiceModal({ show: false, quizId: null, allowed: 0, used: 0 });
  };

  const closeModal = () => {
    setChoiceModal({ show: false, quizId: null, allowed: 0, used: 0 });
  };




  return (
    <div>
      <QuizzesControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <FaCaretDown className="me-2 fs-3" />
            <span className="fw-bold">QUIZZES</span>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {filtered.map((q) => {

              const now = new Date();
              const availableFrom = new Date(q.dates.availableFrom);
              const availableUntil = new Date(q.dates.availableUntil);
              const dueDate = new Date(q.dates.dueDate);

              let status = "";
              if (now < availableFrom) {
                status = "not_available";
              } else if (now > availableUntil) {
                status = "closed";
              } else {
                status = "available";
              }


              const published = now > availableFrom;

              return (
                <ListGroup.Item key={q.quizId} className="wd-lesson p-3 ps-1">
                  <div className="d-flex align-items-start">
                    <GoRocket className="me-2 fs-3 mt-4 text-success bg-white rounded-circle" />

                  <div className="ms-2 flex-grow-1">
                      <div className="fw-bold">
                        {canEdit ? (
                          // faculty go to editor 
                          <Link
                            to={`/Kambaz/Courses/${cid}/Quizzes/${q.quizId}`}
                            className="text-decoration-none text-dark"
                          >
                            {q.title}
                          </Link>
                        ) : (
                          // student handle enter quiz then go to result or quiz taker 
                          <button
                            type="button"
                            onClick={() => handleEnterQuiz(q.quizId)}
                            className="btn btn-link text-decoration-none text-dark p-0"
                          >
                            {q.title}
                          </button>
                        )}
                      </div>
                      <div className="text-secondary">
                        {status === "closed" && (
                          <><span className="fw-bold text-dark">Closed</span> · </>
                        )}
                        {status === "available" && (
                          <><span className="fw-bold text-dark">Available</span> · </>
                        )}
                        {status === "not_available" && (
                          <>
                            <span className="fw-bold text-dark">Not available until</span>{" "}
                            {availableFrom.toLocaleDateString()} ·{" "}
                          </>
                        )}
                        {`Available from ${availableFrom.toLocaleDateString()} · Due ${dueDate.toLocaleDateString()} · `}
{q.points} pts · {q.noOfQuestions} Questions
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <QuizItemButtons published={published} />
                      {canEdit && (
                        <FaTrash
                          className="text-danger fs-5 ms-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(q.quizId)}
                        />
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>



      //modal here 
                  <Modal show={choiceModal.show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose an action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Attempts used: ${choiceModal.used} / ${choiceModal.allowed}.`}
          <div className="mt-2">Do you want to view results or start a new attempt?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={goToResult}>
            View Results
          </Button>
          <Button variant="primary" onClick={goToTake}>
            Start Attempt
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}
