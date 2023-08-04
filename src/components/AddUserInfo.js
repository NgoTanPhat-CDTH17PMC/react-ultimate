import React, { useState } from "react";

// class AddUserInfo extends React.Component {
//   state = {
//     name: "eric",
//     address: "hoi dan it",
//     age: 27,
//   };

//   hanldeOnChangeInput = (event) => {
//     // cap nhat trang thai cua react
//     this.setState({
//       name: event.target.value,
//     });
//   };

//   hanldeOnChangeAge = (event) => {
//     // cap nhat trang thai cua react
//     this.setState({
//       age: event.target.value,
//     });
//   };

//   handleOnSubmit = (event) => {
//     event.preventDefault(); // ngan tu lao lai page
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     }); // thuc thi 1 function tu component cha nen phai dong mo ngoac
//   };

//   render() {
//     return (
//       <div>
//         My name is {this.state.name} and i'm from {this.state.address}, I'm{" "}
//         {this.state.age} years old!
//         <br></br>
//         <br></br>
//         <form onSubmit={(event) => this.handleOnSubmit(event)}>
//           <label>Your name: </label>
//           <input
//             value={this.state.name}
//             type="text"
//             onChange={(event) => this.hanldeOnChangeInput(event)}
//           />

//           <label>Your age: </label>
//           <input
//             value={this.state.age}
//             type="text"
//             onChange={(event) => this.hanldeOnChangeAge(event)}
//           />

//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

const AddUserInfo = (props) => {
  const [name, setName] = useState("eric");
  const [address, setAddress] = useState("Hoi dan it");
  const [age, setAge] = useState("27");

  const hanldeOnChangeInput = (event) => {
    // cap nhat trang thai cua react
    setName(event.target.value);
  };

  const hanldeOnChangeAge = (event) => {
    // cap nhat trang thai cua react
    setAge(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault(); // ngan tu lao lai page
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    }); // thuc thi 1 function tu component cha nen phai dong mo ngoac
  };

  return (
    <>
      My name is {name} and i'm from {address}, I'm {age} years old!
      <br></br>
      <br></br>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your name: </label>
        <input
          value={name}
          type="text"
          onChange={(event) => hanldeOnChangeInput(event)}
        />

        <label>Your age: </label>
        <input
          value={age}
          type="text"
          onChange={(event) => hanldeOnChangeAge(event)}
        />

        <button>Submit</button>
      </form>
    </>
  );
};

export default AddUserInfo;
