import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../sevices/apiServices";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate, fetchListUsers } = props;
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    props.resetUpdateData();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // update state

      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitCreateUser = async () => {
    let data = await putUpdateUser(dataUpdate.id, username, role, image);

    if (data && data.EC == 0) {
      toast.success(data.EM);
      handleClose();
      // props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(props.currentPage);
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
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="inputUserName"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
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
            onClick={() => handleSubmitCreateUser()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
