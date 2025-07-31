import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark.tsx";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default function AssignmentControls({assignmentId, deleteAssignment, isFaculty}: { assignmentId: string, deleteAssignment: (assignmentId: string) => void, isFaculty: boolean}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        deleteAssignment(assignmentId);
        setShowDeleteDialog(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteDialog(false);
    };

    return (
        <>
            <div className="float-end">
                {isFaculty && (
                    <FaTrash
                        className="text-danger me-3 mb-2"
                        onClick={handleDeleteClick}
                        style={{ cursor: 'pointer' }}
                    />
                )}
                <GreenCheckmark/>
                <IoEllipsisVertical className="fs-3" style={{marginLeft: "20px"}}/>
            </div>

            <Modal show={showDeleteDialog} onHide={handleCancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove the assignment?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}