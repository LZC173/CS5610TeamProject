// src/Kambaz/Courses/Quizzes/QuizzesControls.tsx

import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

interface QuizzesControlsProps {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  onAddQuiz: () => void;
}

export default function QuizzesControls({
  searchTerm,
  onSearchChange,
  onAddQuiz
}: QuizzesControlsProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <InputGroup className="w-50 mt-5 ms-1">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search for Quiz..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
        />
      </InputGroup>
      <div className="mt-5 me-1">
        <Button variant="danger" onClick={onAddQuiz}>
          <FaPlus className="me-1" />
          Quiz
        </Button>
      </div>
    </div>
  );
}
