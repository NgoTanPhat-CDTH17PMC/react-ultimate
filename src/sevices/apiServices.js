import axios from "axios";
// import instance from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  // submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  try {
    return axios.get("api/v1/participant/all");
  } catch (error) {
    console.log(error);
  }
};

const getAllUsersWithPaginate = (page, limit) => {
  try {
    return axios.get(`api/v1/participant?page=${page}&lmit=${limit}`);
  } catch (error) {
    console.log(error);
  }
};

const putUpdateUser = (id, username, role, image) => {
  // submit data
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

const postLogin = (userEmail, userPassword) => {
  return axios.post(`/api/v1/login`, {
    email: userEmail,
    password: userPassword,
    delay: 5000,
  });
};

const postRegister = (userUsername, userEmail, userPassword) => {
  return axios.post(`/api/v1/register`, {
    username: userUsername,
    email: userEmail,
    password: userPassword,
  });
};

const getQuizByUser = () => {
  return axios.get(`/api/v1/quiz-by-participant`);
};

const getDataQuiz = (quizId) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`);
};
export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getAllUsersWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
};
