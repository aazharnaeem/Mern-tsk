const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "login":
      console.log(action,'THE ACAITON')
      const accessToken = action.payload.token;
      localStorage.setItem("accessToken", accessToken);
      return { ...state, accessToken };
    case "logout":
      localStorage.removeItem("accessToken");
      return {};
    default:
      return state;
  }
};

export default authReducer;
