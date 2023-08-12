import { INCREMENT, DECREMENT } from "../action/counterAction";
const INITIAL_STATE = {
  // khoi tạo state
  count: 0,
  name: "Eric",
};
const countReducer = (state = INITIAL_STATE, action) => {
  switch (
    action.type // mỗi lần fire 1 action thì sẽ dựa vào type để xử lý logic
  ) {
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

export default countReducer;
