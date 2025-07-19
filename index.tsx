// src/Kambaz/Courses/Quizzes/index.tsx
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";
import "../../styles.css";

import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import QuizItemButtons from "./QuizItemButtons";

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
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> QUIZZES{" "}
            <QuizControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {filtered.map(q => (
              <ListGroup.Item key={q.id} className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3 mt-4" />
                  <div className="ms-2">
                    <div className="fw-bold">
                      <Link to={`/Kambaz/Courses/${cid}/Quizzes/${q.id}`}>
                        {q.title}
                      </Link>
                    </div>
                    <div className="text-secondary">
                      Closed · Due {new Date(q.availability.dueDate!).toLocaleDateString()} ·{" "}
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
