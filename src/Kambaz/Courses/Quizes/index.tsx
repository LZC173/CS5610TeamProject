import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoRocket } from "react-icons/go";
import { FaCaretDown, FaTrash } from "react-icons/fa";

import QuizzesControls from "./QuizzesControls.tsx";
import QuizItemButtons from "./QuizItemButtons.tsx";
import { deleteQuiz } from "./reducer.ts";

import type { Quiz } from "./reducer.ts";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const canEdit = currentUser.role === "FACULTY";

  const { cid } = useParams<{ cid: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const {quizzes} = useSelector((state: any) => state.quizzesReducer) as Quiz[];

  const filtered = quizzes
    .filter((q) => q.course === cid)
    .filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(id));
    }
  };

  return (
    <div>
      <QuizzesControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddQuiz={() => {}}
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
                        <Link
                          to={`/Kambaz/Courses/${cid}/Quizzes/${q.quizId}`}
                          className="text-decoration-none text-dark"
                        >
                          {q.title}
                        </Link>
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
    </div>
  );
}
