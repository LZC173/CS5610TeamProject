// src/Kambaz/Courses/Quizzes/QuizControlButtons.tsx

import { Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControlButtons() {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <Button variant="light" className="rounded-pill border">
        40% of Total
      </Button>
      <Button
        variant="light"
        className="rounded-circle border p-0"
        style={{ width: "32px", height: "32px" }}
      >
        <BsPlus className="fs-4" />
      </Button>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
