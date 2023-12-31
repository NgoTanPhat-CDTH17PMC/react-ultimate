import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin } from "../../sevices/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
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

    setIsLoading(true);
    // submit
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };
  const handleGoBack = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleKeyDown = (event) => {
    if (event && event.keyCode === 13) {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="header col-12 mx-auto">
        <span>Don't have an account yet?</span>
        <button onClick={() => handleRegister()}>Sign up</button>
        <Language />
      </div>
      <div className="title col-5 mx-auto">HoiDanIt</div>
      <div className="welcome col-5 mx-auto">Hello, who's this?</div>
      <div className="content-form col-5 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onKeyDown={(event) => handleKeyDown(event)}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn-submit btn btn-primary has-custom"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            <span>
              {isLoading === true && <ImSpinner10 />}
              Login in
            </span>
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

export default Login;
