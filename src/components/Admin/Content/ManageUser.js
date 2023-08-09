import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn has-custom btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add New User
          </button>
        </div>
        <div className="table-users-container">table users</div>
        <div>
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
