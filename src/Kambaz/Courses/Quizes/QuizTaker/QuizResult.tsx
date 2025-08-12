/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import * as quizClient from "../client.ts";
import type QuestionDetails from "../Interface/QuestionDetails";

type AnswersMap = Record<string, string>;

export default function QuizResult() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<QuestionDetails[]>([]);
  const [answers, setAnswers] = useState<AnswersMap>({});

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const data = await quizClient.getAttemptDetails(qid);
      if (!data) {
        setAttempt(null);
        setQuestions([]);
        setAnswers({});
        setLoading(false);
        return;
      }

      const ansObj: AnswersMap = {};
      if (data.answers) {
        Object.entries(data.answers as Record<string, any>).forEach(([k, v]) => {
          ansObj[k] = String(v ?? "");
        });
      }

      const qs: QuestionDetails[] = (data.quiz?.questions ?? []).map((q: any) => ({
        ...q,
        correctAnswers: q.correctAnswers ?? "",
      }));

      setAttempt(data);
      setQuestions(qs);
      setAnswers(ansObj);
      setLoading(false);
    })();
  }, [qid]);

  const totalPoints = useMemo(
    () => questions.reduce((sum, q) => sum + (Number(q.points) || 0), 0),
    [questions]
  );

  const isCorrect = (q: QuestionDetails) => {
    const ua = answers[q.questionId ?? ""] ?? "";
    const ca = q.correctAnswers ?? "";
    return ua === ca;
  };

  if (loading) return null;

  if (!attempt) {
    return (
      <div className="container-fluid p-4">
        <h4 className="mb-3">Quiz Result</h4>
        <div className="alert alert-info">No attempts found for this quiz.</div>
        <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">{attempt.quiz?.details?.title ?? "Quiz Result"}</h4>
        <div className="text-muted">
          Attempt #{attempt.noOfAttempts ?? 1} ·{" "}
          {attempt.attemptDate ? new Date(attempt.attemptDate).toLocaleString() : ""}
        </div>
      </div>

      <div className="border rounded p-3 mb-4 d-flex justify-content-between align-items-center">
        <div className="fs-5">
          Score: <strong>{attempt.score ?? 0}</strong> / {totalPoints}
        </div>
        <Badge bg={(attempt.score ?? 0) === totalPoints ? "success" : "secondary"}>
          {Math.round(((attempt.score ?? 0) / (totalPoints || 1)) * 100)}%
        </Badge>
      </div>

      {questions.map((q, index) => {
        const qidKey = q.questionId ?? String(index);
        const userAns = answers[qidKey] ?? "";
        const correctAns = q.correctAnswers ?? "";
        const correct = isCorrect(q);

        return (
          <div className="row mb-4" key={qidKey}>
            <div className="col-12">
              <div className="border rounded">
                <div className="px-3 py-2 bg-light d-flex justify-content-between align-items-center border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="fw-bold me-2">Question {index + 1}:</span>
                    <span className="fw-semibold">{q.questionTitle}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-muted">
                      <span className="me-2">pts:</span>
                      <span className="fw-bold">{q.points}</span>
                    </span>
                    <Badge bg={correct ? "success" : "danger"}>
                      {correct ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                </div>

                {q.questionDescription && (
                  <div className="px-3 py-3" style={{ height: 200, overflowY: "auto" }}>
                    <div
                      className="text-secondary"
                      dangerouslySetInnerHTML={{ __html: q.questionDescription }}
                    />
                  </div>
                )}

                <div
                  className="bg-light px-3 py-0 d-flex justify-content-end align-items-center text-muted small border-top"
                  style={{ height: 60 }}
                >
                  <span></span>
                </div>

                <div className="px-3 pb-3">
                  <div className="mb-2">
                    <span className="fw-bold me-2">Your Answer:</span>
                    <span>{userAns || <em className="text-muted">N/A</em>}</span>
                  </div>
                  <div>
                    <span className="fw-bold me-2">Correct Answer:</span>
                    <span>{correctAns || <em className="text-muted">N/A</em>}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="d-flex justify-content-start">
        <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    </div>
  );
}
