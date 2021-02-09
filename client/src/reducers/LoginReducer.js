export const loginreducer = (state, action) => {
  switch (action.type) {
    // we only need to change this value to true when a user is logged in
    case "IS_LOGGED":
      return { ...state, isLogged: action.user.isLogged, id: action.user.id };
    case "LOGGING":
      return {
        isLogged: action.user.isLogged,
      };
    case "AUTHORIZATION":
      return { ...state, authorized: action.user.authorized };
    case "COACH":
      return { ...state, coachID: action.coachID };
    default:
      return state;
  }
};
