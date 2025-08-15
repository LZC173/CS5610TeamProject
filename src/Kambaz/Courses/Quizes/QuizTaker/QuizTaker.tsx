
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Button, FormControl, Modal} from "react-bootstrap";
import * as quizClient from "../client.ts";
import type QuestionDetails from "../Interface/QuestionDetails";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function QuizTaker() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<QuestionDetails[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState(false);
 const [attemptScore, setAttemptScore] = useState(null);


 //one question at a time
 const [oneAtATime, setOneAtATime] = useState(false);
const [qIndex, setQIndex] = useState(0);
const goPrev = () => setQIndex((i) => (i > 0 ? i - 1 : i));
const goNext = () => setQIndex((i) => (i < questions.length - 1 ? i + 1 : i));



  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

useEffect(() => {
  (async () => {
    const data = await quizClient.fetchDetails(qid as string);

    setDetails(data.details);
    const qs: QuestionDetails[] = (data.questions ?? []).map((q: any) => ({
      ...q,
      correctAnswers: q.correctAnswers ?? "", 
    }));
    setQuestions(qs);
    setLoading(false);
    if(data.details.options.accessCode === accessCode){
      setShowQuiz(true);
    }

  setOneAtATime(!!data?.details?.options?.oneQuestionAtATime);
  setQIndex(0);

  })();
}, [qid]);


  //html to text!!!
  const htmlToText = (html: string) =>
  String(html || "")
    .replace(/<[^>]+>/g, " ")   
    .replace(/&nbsp;/g, " ")     
    .replace(/\s+/g, " ")      
    .trim();

  //set single awnser or fill in blank!!
  const setSingle = (id: string, val: string) => {
    setAnswers((a) => ({ ...a, [id]: val }));
  };

  //get the anwser to split to array 
  const getMultiArray = (id: string) => {
    const s = answers[id];
    if (!s) return [];
    return s.split(",").map((x) => x.trim()).filter(Boolean);
  };

  //store them 
  // make change, push it to array if not in side array
  // delete it if alreay inside array
  //mimic the process of multiple choice 
  const toggleMulti = (id: string, opt: string) => {
    const arr = getMultiArray(id);
    const i = arr.indexOf(opt);
    if (i >= 0) arr.splice(i, 1);
    else arr.push(opt);
    arr.sort();
    setAnswers((a) => ({ ...a, [id]: arr.join(",") }));
  };


  const submitCode = ()=>{
    if(accessCode === details.options.accessCode) {
      setShowQuiz(true);
      setTimeLeft(details.options.timeLimit * 60);
      setTimerStarted(true);
    }
  }

const onSubmit = async () => {
  if (!qid) return;

  try {
    setSubmitting(true);
    

    const out: Record<string, string> = {};

    questions.forEach((q, index) => {
      const key = q.questionId ?? String(index);   //get value from local state 
      let val = answers[key] ?? "";
      if (q.questionType === "fill-in-blank") {
        // If it is fill in blank ,then try to use html to text
        val = htmlToText(val);
      } else if (q.questionType === "multi-select") {
        //
        val = getMultiArray(key).join(",");
      }
      // using question id as key 
      out[q.questionId ?? key] = val;
    });

    // find number of unanwered question 
    const unanswered = questions.filter((q, i) => {
      const k = q.questionId ?? String(i);
      return !out[k];
    }).length;
    if (unanswered > 0) {
      const goOn = window.confirm(`not complete ?? are you sure ??`);
      if (!goOn) { setSubmitting(false); return; }
    }

    //submit to backend 
    const response = await quizClient.submitAttempt(qid, out);
    setAttemptScore(response)
    alert("submitted");
    //navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  } catch (e) {
    console.error(e);
    alert("submit fail !!!");
  } finally {
    setSubmitting(false);
     navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/result`); 
  }
};

  const renderList = oneAtATime
  ? (questions[qIndex] ? [questions[qIndex]] : [])
  : questions;

  if (loading) return null;
  

  return (
      <div className="container-fluid p-4">
        {showQuiz?
          <div>
            {timerStarted && (
                <div className="row mb-3">
                  <div className="col-5 ms-auto">
                    <div className="alert alert-info d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Time Remaining: {formatTime(timeLeft)}</span>
                    </div>
                    {timeLeft <= 60 && timeLeft > 0 && (
                        <div className="alert alert-warning">
                          ⚠️ Less than 1 minute remaining!
                        </div>
                    )}
                  </div>
                </div>
            )}
            <div className="row mb-4">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h4 className="m-0">{details?.title}</h4>
                <div className="d-flex align-items-center text-muted">
                  {details?.dates?.availableFrom && (
                      <span className="me-3">
                Available: {new Date(details.dates.availableFrom).toLocaleDateString()}
              </span>
                  )}
                  {details?.dates?.dueDate && (
                      <span>Due: {new Date(details.dates.dueDate).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>

            {attemptScore &&
                <h4>Your score : {attemptScore?.score} out of {attemptScore?.points}</h4>
            }

            {details?.description && (
                <div className="description_editor mb-4">
                  <label className="form-label fw-medium">Quiz Instructions:</label>
                  <div className="border rounded">
                    <div className="px-3 py-3">
                      <div
                          className="text-secondary"
                          dangerouslySetInnerHTML={{__html: details.description}}
                      />
                    </div>
                    <div
                        className="bg-light px-3 py-2 d-flex justify-content-end align-items-center text-muted small border-top">
                      <span></span>
                    </div>
                  </div>
                </div>
            )}


            {renderList.map((q, index) => {
                const realIndex = oneAtATime ? qIndex : index;
                const qKey = q.questionId ?? String(realIndex);

                return (
                  <div className="row mb-4" key={qKey}>
                    <div className="col-12">
                      <div className="border rounded">
                        <div className="px-3 py-2 bg-light d-flex justify-content-between align-items-center border-bottom">
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-2">
                              Question {realIndex + 1}{oneAtATime ? ` / ${questions.length}` : ""}:
                            </span>
                            <span className="fw-semibold">{q.questionTitle}</span>
                          </div>
                          <div className="d-flex align-items-center text-muted">
                            <span className="me-3">
                              <span className="me-2">pts:</span>
                              <span className="fw-bold">{q.points}</span>
                            </span>
                            <span></span>
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
                          <label className="form-label fw-bold">Answers:</label>

                          {q.questionType === "multi-select" && (
                            <div>
                              {q.possibleAnswers.map((opt, i) => {
                                const id = `${qKey}-opt-${i}`;
                                const checked = answers[qKey] === opt;
                                return (
                                  <div key={id} className="form-check mb-2">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name={qKey}
                                      id={id}
                                      value={opt}
                                      checked={checked}
                                      onChange={() => setSingle(qKey, opt)}
                                      style={{ transform: "scale(1.5)" }}
                                    />
                                    <label className="form-check-label fs-5" htmlFor={id}>
                                      {opt}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {q.questionType === "true-false" && (
                            <div>
                              {(q.possibleAnswers?.length ? q.possibleAnswers : ["True", "False"]).map(
                                (opt, i) => {
                                  const id = `${qKey}-tf-${i}`;
                                  const checked = answers[qKey] === opt;
                                  return (
                                    <div key={id} className="form-check mb-2">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name={qKey}
                                        id={id}
                                        value={opt}
                                        checked={checked}
                                        onChange={() => setSingle(qKey, opt)}
                                        style={{ transform: "scale(1.5)" }}
                                      />
                                      <label className="form-check-label fs-5" htmlFor={id}>
                                        {opt}
                                      </label>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}

                          {q.questionType === "fill-in-blank" && (
                            <>
                              <div className="mb-2">
                                <label className="form-label text-dark">Your Answer:</label>
                              </div>
                              <ReactQuill
                                theme="snow"
                                value={answers[qKey] ?? ""}
                                onChange={(val) => setSingle(qKey, val)}
                                placeholder="Enter your answer..."
                                style={{ height: 160 }}
                                modules={{
                                  toolbar: [
                                    [{ size: ["small", false, "large"] }],
                                    ["bold", "italic", "underline"],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    ["clean"],
                                  ],
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

          <div className="d-flex justify-content-start align-items-center">
            <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>
              Cancel
            </Button>

            {oneAtATime ? (
              <>
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={goPrev}
                  disabled={qIndex === 0}
                >
                  Previous
                </Button>

                {qIndex < questions.length - 1 ? (
                  <Button variant="primary" onClick={goNext}>
                    Next
                  </Button>
                ) : (
                  <Button variant="danger" onClick={onSubmit}>
                    Submit
                  </Button>
                )}
              </>
            ) : (
              <Button variant="danger" onClick={onSubmit}>
                Submit
              </Button>
            )}
          </div>

          </div>
        :
          <Modal show={true} style={{marginLeft:'5vw', marginTop: '10vh'}}>
            <Modal.Header closeButton onClick={() => {
              navigate(-1)
            }}>
              <Modal.Title>Access Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl value={accessCode}
                           placeholder="Enter access code here"
                           onChange={(e) => { setAccessCode(e.target.value); }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger"
                      onClick={() => {
                        submitCode()
                      }} > Submit Code </Button>
            </Modal.Footer>
          </Modal>
        }
      </div>
  );
}
