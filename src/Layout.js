import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import CardList from "./components/Admin/Content/Card/CardList";
import Question from "./components/Admin/Content/Question/Questions";

const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger"> Not Found Data</div>
  );
};
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="user" element={<ListQuiz />}></Route>
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />}></Route>
          {/* <Route path="manage-quiz" element={<ManageQuiz />}></Route> */}
          <Route path="manage-users" element={<ManageUser />}></Route>
          <Route path="manage-cards" element={<CardList />}></Route>
          <Route path="manage-quizzes" element={<ManageQuiz />}></Route>
          <Route path="manage-questions" element={<Question />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default Layout;
