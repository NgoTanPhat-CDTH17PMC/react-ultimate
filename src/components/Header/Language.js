import NavDropdown from "react-bootstrap/NavDropdown";

const Language = (props) => {
  return (
    <>
      <NavDropdown
        title="Viet Nam"
        id="basic-nav-dropdown-2"
        classname="languages"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Viet Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
