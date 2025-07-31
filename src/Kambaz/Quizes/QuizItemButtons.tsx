// src/Kambaz/Courses/Quizzes/QuizItemButtons.tsx

import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

interface QuizItemButtonsProps {
  published: boolean;
}

export default function QuizItemButtons({
  published
}: QuizItemButtonsProps) {
  return (
    <div className="float-end">
      {published ? (
        <FaCheckCircle className="text-success fs-5 me-2" />
      ) : (
        <span className="text-danger fs-5 me-2">🚫</span>
      )}
      <IoEllipsisVertical className="fs-5" />
    </div>
  );
}
