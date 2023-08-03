// class component (co ban ban dau)
// function component (hook)

import React from "react"; // import thư viện react
import UserInfo from "./UserInfo";
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

  render() {
    //tap hop nhung nguyen lieu, duc ket duoc 1 cai gi day
    //
    return (
      <div>
        <br></br>
        <UserInfo></UserInfo>
        <hr />
        <br></br>
        <DisplayInfo listUsers={this.state.listUsers}></DisplayInfo>
      </div>
    );
  }
}

export default MyComponent;
