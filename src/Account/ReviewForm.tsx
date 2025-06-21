import {Button, FormControl, Modal} from "react-bootstrap";

export default function ReviewForm({show, handleClose, dialogTitle}: {
    show: boolean; handleClose: () => void; dialogTitle: string;
    //addReview: () => void; setReview: (description: string) => void;
}) {
    return (
        <Modal show={show} onHide={handleClose} id={"sn-review-form"}>
            <Modal.Header closeButton id={"sn-review-modal-header"}>
                <Modal.Title id={"sn-review-modal-title"}>{dialogTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body id={"sn-review-modal-body"}>
                Book title:
                <FormControl id={"sn-review-modal-text-search"} placeholder={"Search for a book to review"}
                    //onChange={(e) => setReview(e.target.value)}
                />
                Add your review:
                <FormControl id={"sn-review-modal-text"} placeholder={"Add your thoughts"}
                             //onChange={(e) => setReview(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant={"danger"} id={"sn-review-cancel-button"}>
                    Cancel
                </Button>
                <Button onClick={() => {
                    //addReview();
                    handleClose();}} className={"sn-bg-tan"} id={"sn-review-add-button"}>
                    Add Review
                </Button>
            </Modal.Footer>
        </Modal>
    );
}