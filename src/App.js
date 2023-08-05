// import logo from "./logo.svg";
import "./App.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
// import MyComponent from "./components/MyComponent";
import React from "react";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="header-container">
          <Header></Header>
        </div>

        <div className="main-container">
          <div className="sidenav-container"></div>
          <div className="app-content">
            <Outlet />
          </div>
        </div>
        <div>
          <Link to="/user">Go to user page</Link>
          <Link to="/admin">Go to admin page</Link>
        </div>
      </div>
    );
  }
}

// const App = () => { // arrow function , function component
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hello World
//         </p>
//         <div>Count = {count}</div>
//         <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//         <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//       </header>
//     </div>
//   );
// }

export default App;
