
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoRocket } from "react-icons/go";
import { FaCaretDown, FaTrash } from "react-icons/fa";

import QuizzesControls from "./QuizzesControls";
import QuizItemButtons from "./QuizItemButtons";
import { deleteQuiz } from "./reducer";

import type { Quiz } from "./reducer";
import "../../styles.css";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const canEdit = currentUser.role === "FACULTY";  // can edit when it is faculty 

  const { cid } = useParams<{ cid: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) as Quiz[];

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
            {filtered.map((q) => (
              <ListGroup.Item key={q.id} className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-start">
                  <GoRocket className="me-2 fs-3 mt-4 text-success bg-white rounded-circle" />

                  <div className="ms-2 flex-grow-1">
                    <div className="fw-bold">
                      <Link
                        to={`/Kambaz/Courses/${cid}/Quizzes/${q.id}`}
                        className="text-decoration-none text-dark"
                      >
                        {q.title}
                      </Link>
                    </div>
                    <div className="text-secondary">
                      {q.availability.status === "closed" && (
                        <><span className="fw-bold text-dark">Closed</span> · </>
                      )}
                      {q.availability.status === "available" && (
                        <><span className="fw-bold text-dark">Available</span> · </>
                      )}
                      {q.availability.status === "not_available" && (
                        <>
                          <span className="fw-bold text-dark">Not available until</span>{" "}
                          {new Date(q.availability.notAvailableUntil!).toLocaleDateString()} ·{" "}
                        </>
                      )}
                      {(() => {
                        const rawDue = q.dueDates?.[0] ?? q.availability.dueDate;
                        return rawDue
                          ? `Due ${new Date(rawDue).toLocaleDateString()} · `
                          : "";
                      })()}
                      {q.points} pts · {q.questionCount} Questions
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <QuizItemButtons published={q.published} />
                    {canEdit && (
                      <FaTrash
                        className="text-danger fs-5 ms-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(q.id)}
                      />
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
