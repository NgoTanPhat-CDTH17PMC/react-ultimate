import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../../sevices/apiServices";
import Select from "react-select";
import _ from "lodash";

const ModalUpdateQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const {
    show,
    setShow,
    dataUpdate,
    // fetchListUsers
    fetchQuiz,
    setDataUpdate,
  } = props;
  const handleClose = () => {
    setShow(false);
    setDescription("");
    setName("");
    setDifficulty("EASY");
    setImage("");
    setPreviewImageModalUpdate("");
    setDataUpdate();
  };

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState(null);
  const [previewImageModalUpdate, setPreviewImageModalUpdate] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // update state

      setDescription(dataUpdate.description);
      setName(dataUpdate.name);
      setDifficulty(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImageModalUpdate(
          `data:image/jpeg;base64,${dataUpdate.image}`
        );
      }
    }
  }, [dataUpdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImageModalUpdate(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuiz(
      dataUpdate.id,
      description,
      name,
      difficulty,
      image
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // props.setCurrentPage(1);
      await fetchQuiz(props.currentPage);
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="inputDescription4"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName4"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <Select
                value={difficulty}
                defaultValue={difficulty}
                onChange={setDifficulty}
                option={options}
                placeholder="Quiz type..."
              />
            </div>
            <div className="col-md-12">
              <label
                className="form-label label-upload"
                htmlFor={`labelUpload-1`}
              >
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id={`labelUpload-1`}
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImageModalUpdate ? (
                <img src={previewImageModalUpdate} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="has-custom"
            variant="primary"
            onClick={() => handleSubmitUpdateQuiz()}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
