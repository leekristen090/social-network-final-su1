import {Button, FormControl, Modal} from "react-bootstrap";

export default function GoalForm({show, handleClose, dialogTitle}: {
    show: boolean; handleClose: () => void; dialogTitle: string;
}) {
    return (
        <Modal show={show} onHide={handleClose} id={"sn-goal-form"}>
            <Modal.Header closeButton id={"sn-goal-form-header"}>
                <Modal.Title id={"sn-goal-modal-title"}>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body id={"sn-goal-modal-body"}>
                Goal name:
                <FormControl id={"sn-goal-modal-text-name"} placeholder={"What is your goal?"} />
                Progress:
                <FormControl id={"sn-goal-modal-progress"} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant={"danger"} id={"sn-goal-cancel-button"}>
                    Cancel
                </Button>
                <Button onClick={() => {
                    handleClose();}} className={"sn-bg-tan"} id={"sn-goal-add-button"}>
                    Add Goal
                </Button>
            </Modal.Footer>
        </Modal>
    );
}