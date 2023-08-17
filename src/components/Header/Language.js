import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
const Language = (props) => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "en" ? "English" : "Viet Nam"}
        id="basic-nav-dropdown-2"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Viet Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
