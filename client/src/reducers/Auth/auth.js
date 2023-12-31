const initialValue = {
  isLoading: true,
  isLogin: false,
  user: {},
};

const authReducer = (state = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case "AUTH_SUCCESS":
    case "LOGIN":
      localStorage.setItem("token", payload.token);

      return {
        isLoading: false,
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLoading: false,
        isLogin: false,
        user: {},
      };
    case "STOP_LOADING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
    // throw new Error("type doesn't match cases");
  }
};

export default authReducer;
