import React from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

// stateless vs statefull
// class DisplayInfo extends React.Component {
//   // // REACT CLASS CONSTRUCTOR
//   // constructor(props) {
//   //   console.log(">> call constructor");

//   //   // cbi du lieu cho component (chay dau tien truoc render)
//   //   super(props);
//   //   // ke thua props tu component cha xuong
//   //   this.state = {
//   //     isShowListUser: true,
//   //   };
//   // }

//   // componentDidMount() {
//   //   console.log(">> call component did mount");
//   //   setTimeout(() => {
//   //     document.title = "Home page";
//   //   }, 3000);
//   // }

//   // componentDidUpdate(prevProps, prevState) {
//   //   console.log(">> call component did update");
//   //   if (this.props.listUsers !== prevProps.listUsers) {
//   //     if (this.props.listUsers.length === 5) {
//   //       alert("full user!");
//   //     }
//   //   }
//   // }

//   // handleShowHide = () => {
//   //   this.setState({
//   //     isShowListUser: !this.state.isShowListUser,
//   //   });
//   // };

//   render() {
//     //props => Properties giao tiep giua cac component

//     console.log(">> call render");
//     const { listUsers } = this.props;

//     return (
//       <div className="display-info-container">
//         {/* <img src={logo} alt="logo" /> */}
//         {/* <div>
//           <span
//             onClick={() => {
//               this.handleShowHide();
//             }}
//           >
//             {this.state.isShowListUser ? "Hide list users:" : "Show list users"}
//           </span>
//         </div> */}

//         {/* this.state.isShowListUser  */}
//         {true && (
//           <>
//             {listUsers.map((user, index) => {
//               return (
//                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                   <div>
//                     <p>My name is {user.name}</p>
//                     <p>My age is {user.age}</p>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => {
//                         this.props.handleDeleteUser(user.id);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfo = (props) => {
  // doi voi function component thì props tự động truyền vào. CÒn class component thì phải constructor để nhận props từ thằng component cha
  const { listUsers } = props;

  return (
    <div className="display-info-container">
      {true && (
        <>
          {listUsers.map((user, index) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>
                  <p>My name is {user.name}</p>
                  <p>My age is {user.age}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      props.handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DisplayInfo;
