import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../sevices/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import Profile from "./Profile";
import { useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const account = useSelector((state) => {
    return state.user.account;
  });

  const [showModalProfile, setShowModalProfile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    try {
      let res = await logout(account.email, account.access_token);
      if (res && res.EC === 0) {
        //clear data redux
        dispatch(doLogout());
        navigate("/login");
      } else {
        toast.error(res.EM);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleClickModalProfile = (user) => {
    setShowModalProfile(true);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="navbar-brand" href="#home">
            Hoi Dan IT
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/user" className="nav-link">
                User
              </NavLink>
              <NavLink to="/admin" className="nav-link">
                Admin
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated && isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    Login
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => handleRegister()}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleClickModalProfile()}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Profile show={showModalProfile} setShow={setShowModalProfile} />
    </>
  );
};

export default Header;
