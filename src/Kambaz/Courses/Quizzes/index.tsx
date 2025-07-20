// src/Kambaz/Courses/Quizzes/index.tsx
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import "../../styles.css";
import { FaRocket } from "react-icons/fa";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import QuizItemButtons from "./QuizItemButtons";
import { FaCaretDown }  from "react-icons/fa";
export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    setQuizzes(db.quizzes.filter(q => q.course === cid));
  }, [cid]);

  //search item
  const filtered = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="d-flex align-items-center">
              <FaCaretDown className="me-2 fs-3" />
              <span className="fw-bold">QUIZZES</span>
            </div>
            <div className="ms-auto">
              <QuizControlButtons />
            </div>
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {filtered.map(q => (
              <ListGroup.Item key={q.id} className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-start">
                  <FaRocket        className="me-2 fs-3 mt-4 text-success" />
                  <div className="ms-2">
                    <div className="fw-bold">
                     <Link
                        to={`/Kambaz/Courses/${cid}/Quizzes/${q.id}`}
                       className="text-decoration-none text-dark">
                         {q.title}
                      </Link>
                    </div>
                  <div className="text-secondary">
                    {q.availability.status === "closed" && (
                      <>
                        <span className="fw-bold text-dark">Closed</span>
                        {" · "}
                      </>
                    )}
                    {q.availability.status === "available" && (
                      <>
                        <span className="fw-bold text-dark">Available</span>
                        {" · "}
                      </>
                    )}
                    {q.availability.status === "not_available" && (
                      <>
                        <span className="fw-bold text-dark">Not available until</span>{" "}
                        {new Date(q.availability.notAvailableUntil!).toLocaleDateString()}
                        {" · "}
                      </>
                    )}
                    {(() => {
                      const rawDue = q.dueDates?.[0] ?? q.availability.dueDate;
                      return rawDue ? `Due ${new Date(rawDue).toLocaleDateString()}` : "";
                    })()}
                    {" · "}
                    {q.points} pts · {q.questionCount} Questions
                  </div>
                  </div>
                  <div className="ms-auto">
                    <QuizItemButtons published={q.published} />
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
