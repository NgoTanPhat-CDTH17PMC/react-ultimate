// import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });
  const account = useSelector((state) => {
    return state.user.account;
  });
  return (
    <div className="hompage-container">
      <img src="" alt="Homepage" />
    </div>
  );
};

export default HomePage;
