// class component (co ban ban dau)
// function component (hook)

import React from "react"; // import thư viện react
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  // ke thua tinh nag cua react component

  state = {
    listUsers: [
      { id: 1, name: "Hoi Dan IT", age: "30" },
      { id: 2, name: "Eric", age: "15" },
      { id: 3, name: "Harry", age: "55" },
    ],
  };

  handleAddNewUser = (userObj) => {
    this.setState({
      listUsers: [userObj, ...this.state.listUsers],
    });
  };

  handleDeleteUser = (userId) => {
    // let listUserClone = [...this.state.listUsers];
    let listUserClone = this.state.listUsers;
    listUserClone = listUserClone.filter((item) => item.id !== userId);
    this.setState({
      listUsers: listUserClone,
    });
  };
  //JSX
  render() {
    //tap hop nhung nguyen lieu, duc ket duoc 1 cai gi day
    return (
      <div>
        <br></br>
        <AddUserInfo handleAddNewUser={this.handleAddNewUser}></AddUserInfo>
        <hr />
        <br></br>
        <DisplayInfo
          listUsers={this.state.listUsers}
          handleDeleteUser={this.handleDeleteUser}
        ></DisplayInfo>
      </div>
    );
  }
}

export default MyComponent;
