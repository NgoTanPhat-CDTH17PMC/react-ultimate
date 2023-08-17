// import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Homepage.scss";
import homeBanner from "../../assets/home-banner.jpg";
import { useTranslation } from "react-i18next";
const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const { t } = useTranslation();
  return (
    <div className="hompage-container d-flex">
      <img
        className="homepage-image col-md-6"
        src={homeBanner}
        alt="Homepage"
      />
      <div className="homepage-content col-md-6 px-5">
        '<div className="title-1">{t("homepage.title1")}</div>
        <div className="title-2">
          You don't want to make a boring form. And you audience won't answer
          one. Create a typeform instead - and make everone happy.
        </div>
        <div className="title-3">
          {isAuthenticated === false ? (
            <button
              className="btn has-custom"
              onClick={() => navigate("/login")}
            >
              Get's Stated. It's free
            </button>
          ) : (
            <button onClick={() => navigate("/user")}>Doing Quiz Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
