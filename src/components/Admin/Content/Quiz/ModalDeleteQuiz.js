import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../sevices/apiServices";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete, fetchQuiz } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuiz(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz(1);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete quiz{" "}
          <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="btn btn-danger"
            variant="primary"
            onClick={() => handleSubmitDeleteQuiz()}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
