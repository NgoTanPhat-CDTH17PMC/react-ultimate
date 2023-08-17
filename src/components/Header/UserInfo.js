import { useSelector } from "react-redux";
import "./Share.scss";
import { useEffect, useState } from "react";
import _ from "lodash";
import { FcPlus } from "react-icons/fc";
import { Button } from "react-bootstrap";

const UserInfo = (props) => {
  const account = useSelector((state) => state.user.account);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      // update state

      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitCreateUser = () => {};
  return (
    <>
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
            disabled
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

        <Button
          className="has-custom"
          variant="primary"
          onClick={() => handleSubmitCreateUser()}
        >
          Save Changes
        </Button>
      </form>
    </>
  );
};
export default UserInfo;
