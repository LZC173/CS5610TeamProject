import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearData, setDetails, setQuestions, setPoints } from "../Editor/reducer";
import * as quizClient from "../client.ts";

export default function QuizDetails() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [, setQuizState] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Redux state
  const details = useSelector((state: any) => state.editorReducer.details);
  const points = useSelector((state: any) => state.editorReducer.points);

  // Fetch quiz details from API
  const fetchDetails = async (quizId: string) => {
    console.log("Calling quizClient.fetchDetails with ID:", quizId);
    const quizDetails = await quizClient.fetchDetails(quizId);
    console.log(" API Response:", quizDetails);
    setQuizState(quizDetails.published);
    dispatch(setDetails(quizDetails.details));
    dispatch(setQuestions(quizDetails.questions));
    dispatch(setPoints(quizDetails.points));

    console.log(" Details set in Redux:", quizDetails.details);
    console.log(" Points set:", quizDetails.points);
    console.log(" Schedule data:", quizDetails.details?.schedule);

    setLoaded(true);
  };

  useEffect(() => {
    dispatch(clearData());
    console.log(" Clearing Redux data...");
    if (qid) {
      console.log(` Fetching quiz details for QID: ${qid}`);
      fetchDetails(qid);
    } else {
      console.log(" No QID found. Setting loaded = true.");
      setLoaded(true);
    }
  }, [qid]);

  if (!loaded) {
    return <div>Loading...</div>;
  }
    console.log("🔍 Checking schedule before rendering:", details?.schedule);
  return (
    <div id="wd-quiz-details" className="container-fluid p-4">
      {/* Quiz Title */}
      <h1 className="mb-4">{details?.title || "Untitled Quiz"}</h1>

      {/* Top Navigation Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button type="button" className="btn btn-secondary">
          Preview
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/quizzes/${qid}`)
          }
        >
          <FaPencilAlt className="me-2" /> Edit
        </button>
      </div>

      {/* Quiz Details Table */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="fw-bold" style={{ width: "40%" }}>Quiz Type</td>
                <td>{details?.quizType || "N/A"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Points</td>
                <td>{points ?? "0"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Assignment Group</td>
                <td>{details?.assignmentGroup || "N/A"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Shuffle Answers</td>
                <td>{details?.options?.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Time Limit</td>
                <td>{details?.options?.timeLimit ? `${details.timeLimit} Minutes` : "None"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Multiple Attempts</td>
                <td>{details?.options?.noOfAttempts > 1 ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">View Responses</td>
                <td>{details?.options?.showAnswers || "N/A"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Show Correct Answers</td>
                <td>{details?.options?.showAnswers || "N/A"}</td>
              </tr>
              <tr>
                <td className="fw-bold">One Question at a Time</td>
                <td>{details?.options?.oneQuestionAtATime ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Require Respondus LockDown Browser</td>
                <td>{details?.options?.questionLocked ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Required to View Quiz Results</td>
                <td>{details?.options?.showAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Webcam Required</td>
                <td>{details?.options?.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold">Lock Questions After Answering</td>
                <td>{details?.options.questionLocked ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quiz Schedule Table */}
      {/* {details?.schedule && ( */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            <table className="table">
              <thead>
                <tr>
                  <th className="fw-bold">Due</th>
                  <th className="fw-bold">For</th>
                  <th className="fw-bold">Available from</th>
                  <th className="fw-bold">Until</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{details?.dates?.dueDate || "N/A"}</td>
                  <td>Everyone</td>
                  <td>{details?.dates.availableFrom || "N/A"}</td>
                  <td>{details?.dates.availableUntil || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       {/* )
      }  */}
    </div>
  );
}




// import { FaPencilAlt } from "react-icons/fa";
// import { useParams } from "react-router";
// import { useNavigate } from "react-router-dom";
// export default function QuizDetails() {
//   const { cid, qid } = useParams<{ cid: string,qid: string }>();
//   const navigate = useNavigate();
//   return (
//     <div id="wd-quiz-editor" className="container-fluid p-4">
//       {/* Quiz Title */}
//       <h1 className="mb-4">Q1 - HTML</h1>

//       {/* Top Navigation Buttons */}
//       <div className="d-flex justify-content-center gap-3 mb-4">
//         <button 
//           type="button" 
//           className="btn btn-secondary"
//           id="wd-preview-btn"
//         >
//           Preview
//         </button>
//         {/* <button 
//           type="button" 
//           className="btn btn-primary"
//           id="wd-edit-btn"
//         >
//           <FaPencilAlt className="me-2" />
//           Edit
//         </button> */}
//         {/* /Kambaz/Courses/${cid}/Quizzes/${q.quizId} */}
//         <button
//       type="button"
//       className="btn btn-primary"
//       id="wd-edit-btn"
//       onClick={() =>
//         navigate(`/Kambaz/Courses/${cid}/quizzes/${qid}`)
//       }
//     >
//       <FaPencilAlt className="me-2" />
//       Edit
//     </button>
//       </div>

//       {/* Quiz Details Table */}
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <table className="table table-borderless">
//             <tbody>
//               <tr>
//                 <td className="fw-bold" style={{width: '40%'}}>Quiz Type</td>
//                 <td>Graded Quiz</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Points</td>
//                 <td>29</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Assignment Group</td>
//                 <td>QUIZZES</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Shuffle Answers</td>
//                 <td>No</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Time Limit</td>
//                 <td>30 Minutes</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Multiple Attempts</td>
//                 <td>No</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">View Responses</td>
//                 <td>Always</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Show Correct Answers</td>
//                 <td>Immediately</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">One Question at a Time</td>
//                 <td>Yes</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Require Respondus LockDown Browser</td>
//                 <td>No</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Required to View Quiz Results</td>
//                 <td>No</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Webcam Required</td>
//                 <td>No</td>
//               </tr>
//               <tr>
//                 <td className="fw-bold">Lock Questions After Answering</td>
//                 <td>No</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quiz Schedule Table */}
//       <div className="row justify-content-center mt-4">
//         <div className="col-md-10">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th className="fw-bold">Due</th>
//                 <th className="fw-bold">For</th>
//                 <th className="fw-bold">Available from</th>
//                 <th className="fw-bold">Until</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>21 Sep at 1pm</td>
//                 <td>Everyone</td>
//                 <td>Sep 21 at 11:40am</td>
//                 <td>Sep 21 at 1pm</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
