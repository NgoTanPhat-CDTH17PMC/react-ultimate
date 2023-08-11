import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { postLogin } from "../../sevices/apiServices";
import { toast } from "react-toastify";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // validate
    // submit
    let res = await postLogin(email, password);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
    } else {
      toast.error(res.EM);
    }
  };
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
      <div className="header col-12 mx-auto">
        <span>Don't have an account yet?</span>
        <button>Sign up</button>
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
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn-submit btn btn-primary has-custom"
            onClick={() => handleLogin()}
          >
            Login in
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
