// src/Kambaz/Courses/Quizzes/QuizzesControls.tsx
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface QuizzesControlsProps {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  canEdit?: boolean;
}

export default function QuizzesControls({
  searchTerm,
  onSearchChange,
  canEdit = false,
}: QuizzesControlsProps) {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <InputGroup className="w-50 mt-5 ms-1">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search for Quiz..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>

      {canEdit && (
        <div className="mt-5 me-1">
          <Button
            variant="danger"
            onClick={() => navigate("create")}
            aria-label="Add quiz"
          >
            <FaPlus className="me-1" />
            Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
