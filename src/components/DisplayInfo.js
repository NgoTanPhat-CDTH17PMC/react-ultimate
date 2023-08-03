import React from "react";

class DisplayInfo extends React.Component {
  render() {
    //props => Properties giao tiep giua cac component

    const { name, age } = this.props;
    return (
      <div>
        <p>My name is {name}</p>
        <p>My age is {age}</p>
      </div>
    );
  }
}

export default DisplayInfo;
