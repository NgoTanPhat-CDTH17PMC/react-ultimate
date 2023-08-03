import React from "react";

class DisplayInfo extends React.Component {
  render() {
    //props => Properties giao tiep giua cac component

    const { listUsers } = this.props;
    return (
      <div>
        {/* <p>My name is {name}</p>
        <p>My age is {age}</p> */}
        {listUsers.map((user, index) => {
          return (
            <div key={user.id}>
              <p>My name is {user.name}</p>
              <p>My age is {user.age}</p>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayInfo;
