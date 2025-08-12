
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
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
    await quizClient.submitAttempt(qid, out);

    alert("submitted");
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  } catch (e) {
    console.error(e);
    alert("submit fail !!!");
  } finally {
    setSubmitting(false);
  }
};
  if (loading) return null;

  return (
    <div className="container-fluid p-4">
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


      {details?.description && (
        <div className="description_editor mb-4">
          <label className="form-label fw-medium">Quiz Instructions:</label>
          <div className="border rounded">
            <div className="px-3 py-3">
              <div
                className="text-secondary"
                dangerouslySetInnerHTML={{ __html: details.description }}
              />
            </div>
            <div className="bg-light px-3 py-2 d-flex justify-content-end align-items-center text-muted small border-top">
              <span></span>
            </div>
          </div>
        </div>
      )}


      {questions.map((q, index) => {
        const qKey = q.questionId ?? String(index);
     

        return (
          <div className="row mb-4" key={qKey}>
            <div className="col-12">
              <div className="border rounded">
                <div className="px-3 py-2 bg-light d-flex justify-content-between align-items-center border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="fw-bold me-2">Question {index + 1}:</span>
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
                        const arr = getMultiArray(qKey);
                        const checked = arr.includes(opt);
                        const id = `${qKey}-opt-${i}`;
                        return (
                            <div key={id} className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={id}
                                checked={checked}
                                onChange={() => toggleMulti(qKey, opt)}
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

      <div className="d-flex justify-content-start">
        <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
