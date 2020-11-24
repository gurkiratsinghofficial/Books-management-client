import React from "react";
import { Button, Modal } from "react-bootstrap";
/**
 * @description:Delete modal for confirming delete book action
 * @param {object} props
 */

function DeleteModal(props) {
  const { setDeleteShow, deleteThisBook, isbn, show } = props;
  return (
    <>
      <Modal show={show} onHide={() => props.setDeleteShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete this book?</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteThisBook(isbn)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
