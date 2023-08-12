import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { postRegister } from "../../sevices/apiServices";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    // validate
    const isValidateEmail = validateEmail(email);
    if (!isValidateEmail) {
      toast.error("Invalid Email");
      return;
    }

    if (!password) {
      toast.error("Invalid Password");
      return;
    }
    // submit
    let res = await postRegister(username, email, password);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  const handleGoBack = () => {
    navigate("/");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="header col-12 mx-auto">
        <span>Have an account?</span>
        <button onClick={() => handleLogin()}>Login</button>
      </div>
      <div className="title col-5 mx-auto">HoiDanIt</div>
      <div className="welcome col-5 mx-auto">
        Get better data with conversational forms, surveys, quizzes & more.
      </div>
      <div className="content-form col-5 mx-auto">
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEyeClosed />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEye />
            </span>
          )}
        </div>
        <div>
          <button
            className="btn-submit btn btn-primary has-custom"
            onClick={() => handleRegister()}
          >
            Create my free account
          </button>
        </div>
        <div className="back">
          <span
            onClick={() => {
              handleGoBack();
            }}
          >
            {" "}
            &#60;&#60; Go back
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
