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

const getAllQuiz = () => {
  return axios.get(`/api/v1/quiz/all`);
};

const getDataQuiz = (quizId) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("api/v1/quiz", data);
};

const putUpdateQuiz = (id, description, name, difficulty, image) => {
  // submit data
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.put("api/v1/quiz", data);
};

const deleteQuiz = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  // form-data
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("api/v1/question", data);
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  // x-www-form-urlencoded
  return axios.put("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
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
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuiz,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
};
