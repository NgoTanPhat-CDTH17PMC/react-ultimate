import axios from "axios";
import instance from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  // submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post(instance + "apiv1/participant", data);
};

export { postCreateNewUser };
