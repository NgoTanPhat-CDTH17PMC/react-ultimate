import { useEffect, useState } from "react";
import { getAllUsers } from "../../../sevices/apiServices";

const TableUser = (props) => {
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
    let res = await getAllUsers();

    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  console.log("call render");
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th>{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}

          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan="4">Emply Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
