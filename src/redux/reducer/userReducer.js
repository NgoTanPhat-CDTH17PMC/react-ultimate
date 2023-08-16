import { INCREMENT, DECREMENT } from "../action/counterAction";
import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
  // khoi tạo state
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  usAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (
    action.type // mỗi lần fire 1 action thì sẽ dựa vào type để xử lý logic
  ) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          // nap data vao redux
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        usAuthenticated: true,
      };

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default userReducer;
