import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../sevices/apiServices";
import { toast } from "react-toastify";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUsers, setListUsers] = useState([
    {
      id: "123",
      email: "123@gmail.com",
      username: "123",
      role: "USER",
    },
    {
      id: "456",
      email: "456@gmail.com",
      username: "456",
      role: "ADMIN",
    },
  ]);

  //componentDidMount
  useEffect(() => {
    fetchListUsers();
  }, []); // chay sau khi DOM rendered

  const fetchListUsers = async () => {
    // let res = await getAllUsers();
    // if (res && res.EC === 0) {
    //   setListUsers(res.DT);
    // } else {
    //   toast.error("Data not found!");
    // }
  };

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
        <div className="table-users-container">
          <TableUser listUsers={listUsers} />
        </div>
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
