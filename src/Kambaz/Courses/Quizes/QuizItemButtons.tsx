import { Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "./client.ts";
import { deleteQuiz, togglePublish } from "./reducer.ts";

interface QuizItemButtonsProps {
  published: boolean;
  quizId: string;
  courseId: string;
}

export default function QuizItemButtons({ published, quizId, courseId }: QuizItemButtonsProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Read canonical state from Redux (falls back to prop on first render)
  const isPublished =
    useSelector((s: any) =>
      s.quizzesReducer?.quizzes?.find((q: any) => q.quizId === quizId)?.published
    ) ?? published;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    await quizzesClient.deleteQuiz(id);
    dispatch(deleteQuiz(id));
  };

  const handlePublishToggle = async () => {
    const next = !isPublished;

    // Optimistic UI update
    
    try {
      await quizzesClient.updateStatus(quizId, next);
      dispatch(togglePublish(quizId));
      // success: nothing else to do
    } catch (err) {
      console.error("Failed to toggle publish:", err);
      // Revert on failure
      dispatch(togglePublish(quizId));
      alert("Couldn't update publish status. Please try again.");
    }
  };

  return (
    <Dropdown align="end">
      {/* Status icon */}
      {isPublished ? (
        <FaCheckCircle className="text-success fs-5 me-2" />
      ) : (
        <span className="text-danger fs-5 me-2">🚫</span>
      )}

      <Dropdown.Toggle
        as="span"
        style={{ cursor: "pointer" }}
        className="p-0 m-0 border-0 bg-transparent"
      >
        <IoEllipsisVertical size={24} />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: "140px" }}>
        <Dropdown.Item
          onClick={() =>
            navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/details`)
          }
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(quizId)}>Delete</Dropdown.Item>
        <Dropdown.Item onClick={handlePublishToggle}>
          {isPublished ? "Unpublish" : "Publish"}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}






// import { Dropdown } from "react-bootstrap";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux"; // ✅ real dispatch
// import * as quizzesClient from "./client.ts";
// import { deleteQuiz, togglePublish } from "./reducer.ts";
// import { FaCheckCircle } from "react-icons/fa";

// interface QuizItemButtonsProps {
//   published: boolean;
//   quizId: string;
//   courseId: string;
// }

// export default function QuizItemButtons({ published, quizId, courseId }: QuizItemButtonsProps) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // ✅ use real dispatch

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this quiz?")) {
//       await quizzesClient.deleteQuiz(id);
//       dispatch(deleteQuiz(id));
//     }
//   };

//   const handlePublishToggle = () => {
//     dispatch(togglePublish(quizId));
//   };

//   return (
//     <Dropdown align="end">
//       {isPublished ? (
//         <FaCheckCircle className="text-success fs-5 me-2" />
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}
//       <Dropdown.Toggle
//         as="span"
//         style={{ cursor: "pointer" }}
//         className="p-0 m-0 border-0 bg-transparent"
//       >
//         <IoEllipsisVertical size={24} />
//       </Dropdown.Toggle>

//       <Dropdown.Menu style={{ minWidth: "140px" }}>
//         <Dropdown.Item
//           onClick={() =>
//             navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/details`)
//           }
//         >
//           Edit
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => handleDelete(quizId)}>Delete</Dropdown.Item>
//         <Dropdown.Item onClick={handlePublishToggle}>
//           {published ? "Unpublish" : "Publish"}
//         </Dropdown.Item>
//         <Dropdown.Item>Copy</Dropdown.Item>
//         <Dropdown.Item>Sort</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }

// import { Dropdown } from "react-bootstrap";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";
// import * as quizzesClient from "./client.ts";
// import { deleteQuiz, updateQuizStatus } from "./reducer.ts";
// import { useDispatch } from "react-redux";
// import { useState } from "react";

// interface QuizItemButtonsProps {
//   published: boolean;
//   quizId: string;
//   courseId: string;
// }

// export default function QuizItemButtons({ published, quizId, courseId }: QuizItemButtonsProps) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isPublished, setIsPublished] = useState(published);

//   const handleDelete = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this quiz?")) {
//       await quizzesClient.deleteQuiz(id);
//       dispatch(deleteQuiz(id));
//     }
//   };

//   const handleStatus = async () => {
//     const newStatus = !isPublished;
//     console.log("Toggling status for quiz:", quizId, "New status:", newStatus);

//     await quizzesClient.updateStatus(quizId, newStatus);

//     // update local state for immediate UI feedback
//     setIsPublished(newStatus);

//     // update redux store if needed
//     dispatch(updateQuizStatus({ quizId, published: newStatus }));
//   };

//   return ( 

    
//     <Dropdown align="end">
//       {isPublished ? (
//         <FaCheckCircle className="text-success fs-5 me-2" />
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}
//       <Dropdown.Toggle
//         as="span"
//         style={{ cursor: "pointer" }}
//         className="p-0 m-0 border-0 bg-transparent"
//       >
//         <IoEllipsisVertical size={24} />
//       </Dropdown.Toggle>

//       <Dropdown.Menu style={{ minWidth: "140px" }}>
//         <Dropdown.Item
//           onClick={() =>
//             navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/details`)
//           }
//         >
//           Edit
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => handleDelete(quizId)}>Delete</Dropdown.Item>
//         <Dropdown.Item onClick={handleStatus}>
//           {isPublished ? "Unpublish" : "Publish"}
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }



// import { Dropdown } from "react-bootstrap";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";
// // import quizzesClient from "../../api/quizzesClient"; // Adjust the path as needed
// import * as quizzesClient from "./client.ts";
// import {deleteQuiz, setQuizzes} from "./reducer.ts";
// import { useSelector, useDispatch, } from "react-redux";
// import { useState } from "react";

// interface QuizItemButtonsProps {
//   published: boolean;
//   quizId: string;
//   courseId: string;
// }

// export default function QuizItemButtons({ published, quizId, courseId }: QuizItemButtonsProps) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isPublished, setIsPublished] = useState(published);
//   const handleDelete = async (id: string) => {
//       if (window.confirm("Are you sure you want to delete this quiz?")) {
//         await quizzesClient.deleteQuiz(id);
//         dispatch(deleteQuiz(id));
//       }
//     };
//   const handleStatus = async () => {
//     console.log("Toggling status for quiz:", quizId, "Current status:", published);
//     await quizzesClient.updateStatus(quizId, !isPublished);
//     setIsPublished(!isPublished);
//   }
//   return (
//     <Dropdown align="end">
//        {published ? (
//         <FaCheckCircle className="text-success fs-5 me-2" />
//         // <span className="text-success fs-5 me-2">✔️</span>
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}
//       <Dropdown.Toggle
//         as="span"
//         style={{ cursor: "pointer" }}
//         className="p-0 m-0 border-0 bg-transparent"
//       >
//         <IoEllipsisVertical size={24} />
//       </Dropdown.Toggle>

//       <Dropdown.Menu style={{ minWidth: "140px" }}>
//         <Dropdown.Item
//           onClick={() =>
//             // Quizzes/:qid/details
//             // navigate(`/courses/${courseId}/quizzes/${quizId}/details`)
//             // navigate(`/${quizId}/details`) /Kambaz/Courses/${cid}/Quizzes/${q.quizId}
//             navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/details`)

//             // navigate('/create/')
//           }
//         >
//           Edit
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => handleDelete(quizId)}>Delete</Dropdown.Item>
//         <Dropdown.Item onClick={() => handleStatus()}>{isPublished ? "Unpublish" : "Publish" }</Dropdown.Item>
//         {/* <Dropdown.Item>Copy</Dropdown.Item> */}
//         {/* <Dropdown.Item>Sort</Dropdown.Item> */}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// }


// function dispatch(arg0: any) {
//   throw new Error("Function not implemented.");
// }
// import { Dropdown } from "react-bootstrap";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// interface QuizItemButtonsProps {
//   published: boolean;
//   quizId: string;
//   courseId: string;
// }

// export default function QuizItemButtons({
//   published,
//   quizId,
//   courseId,
// }: QuizItemButtonsProps) {
//   const navigate = useNavigate();

//   return (
//     <div className="float-end">
//       {published ? (
//         <span className="text-success fs-5 me-2">✔️</span>
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}
//       <Dropdown align="end">
//         <Dropdown.Toggle as="span" style={{ cursor: "pointer" }}bsPrefix="" 
//   className="p-0 m-0 border-0 bg-transparent">
//           <IoEllipsisVertical className="fs-4" />
//         </Dropdown.Toggle>

//         <Dropdown.Menu
//           className="py-2"
//           style={{ fontSize: "1.1rem", minWidth: "160px" }}
//         >
//           <Dropdown.Item
//             onClick={() =>
//               navigate(`/quiz-details/${courseId}/${quizId}`)
//             }
//           >
//             Edit
//           </Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// }




// import { Dropdown } from "react-bootstrap";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// interface QuizItemButtonsProps {
//   published: boolean;
// }

// export default function QuizItemButtons({ published }: QuizItemButtonsProps) {
//   const navigate = useNavigate();

//   return (
//     <div className="float-end">
//       {published ? (
//         <span className="text-success fs-5 me-2">✔️</span>
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}
//       <Dropdown align="end">
//         <Dropdown.Toggle as="span" style={{ cursor: "pointer" }}>
//           <IoEllipsisVertical className="fs-4" />
//         </Dropdown.Toggle>

//         <Dropdown.Menu
//           className="py-2"
//           style={{
//             fontSize: "1.1rem",
//             minWidth: "160px", // wider menu
//           }}
//         >
//           <Dropdown.Item onClick={() => navigate("/quiz-details")}>
//             Edit
//           </Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// }




// import { FaCheckCircle } from "react-icons/fa";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// interface QuizItemButtonsProps {
//   published: boolean;
//   quizId: string;
//   courseId: string;
// }

// export default function QuizItemButtons({
//   published,
//   quizId,
//   courseId,
// }: QuizItemButtonsProps) {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const handleEdit = () => {
//     navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}`);
//     setMenuOpen(false);
//   };

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="position-relative d-flex align-items-center" ref={menuRef}>
//       {published ? (
//         <FaCheckCircle className="text-success fs-5 me-2" />
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}

//       <button
//         className="btn btn-light p-1"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <IoEllipsisVertical className="fs-5" />
//       </button>

//       {menuOpen && (
//         <div
//           className="position-absolute bg-white border rounded shadow"
//           style={{ right: 0, top: "100%", zIndex: 1000 }}
//         >
//           <button
//             className="dropdown-item"
//             onClick={handleEdit}
//           >
//             Edit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



// import { FaCheckCircle } from "react-icons/fa";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { Dropdown } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";

// interface QuizItemButtonsProps {
//   published: boolean;
//   quizId: string;
//   courseId: string;
// }

// export default function QuizItemButtons({
//   published,
//   quizId,
//   courseId,
// }: QuizItemButtonsProps) {
//   const navigate = useNavigate();

//   // const handleEdit = () => {
//   //   // Navigate to the Quiz Details page
//   //   navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}`);
//   // };
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const handleEdit = () => {
//     navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}`);
//     setMenuOpen(false);
//   };

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   return (
//     <div className="d-flex align-items-center">
//       {published ? (
//         <FaCheckCircle className="text-success fs-5 me-2" />
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}

//       <Dropdown>
//         <Dropdown.Toggle
//           variant="light"
//           id="dropdown-quiz-options"
//           className="p-1 fs-5"
//         >
//           ⋮
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//           <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// }



// // src/Kambaz/Courses/Quizzes/QuizItemButtons.tsx

// // src/Kambaz/Courses/Quizzes/QuizItemButtons.tsx
// import { FaCheckCircle } from "react-icons/fa";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { useNavigate, useParams } from "react-router-dom";

// interface QuizItemButtonsProps {
//   published: boolean;
//   quizId: string;
//   onDelete: (quizId: string) => void;
//   onTogglePublish: (quizId: string, currentState: boolean) => void;
// }

// export default function QuizItemButtons({
//   published,
//   quizId,
//   onDelete,
//   onTogglePublish
// }: QuizItemButtonsProps) {
//   const navigate = useNavigate();
//   const { cid } = useParams<{ cid: string }>();

//   return (
//     <div className="d-flex align-items-center">
//       {published ? (
//         <FaCheckCircle className="text-success fs-5 me-2" />
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}

//       <div className="dropdown">
//         <button
//           className="btn btn-link p-0"
//           type="button"
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <IoEllipsisVertical className="fs-5" />
//         </button>

//         <ul className="dropdown-menu dropdown-menu-end">
//           <li>
//             <button
//               className="dropdown-item"
//               onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`)}
//             >
//               Edit
//             </button>
//           </li>
//           <li>
//             <button
//               className="dropdown-item text-danger"
//               onClick={() => onDelete(quizId)}
//             >
//               Delete
//             </button>
//           </li>
//           <li>
//             <button
//               className="dropdown-item"
//               onClick={() => onTogglePublish(quizId, published)}
//             >
//               {published ? "Unpublish" : "Publish"}
//             </button>
//           </li>
//           <li>
//             <button className="dropdown-item" disabled>
//               Copy (coming soon)
//             </button>
//           </li>
//           <li>
//             <button className="dropdown-item" disabled>
//               Sort (coming soon)
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }



// import { FaCheckCircle } from "react-icons/fa";
// import { IoEllipsisVertical } from "react-icons/io5";

// interface QuizItemButtonsProps {
//   published: boolean;
// }

// export default function QuizItemButtons({
//   published
// }: QuizItemButtonsProps) {
//   return (
//     <div className="float-end">
//       {published ? (
//         <FaCheckCircle className="text-success fs-5 me-2" />
//       ) : (
//         <span className="text-danger fs-5 me-2">🚫</span>
//       )}
//       <IoEllipsisVertical className="fs-5" />
//     </div>
//   );
// }
