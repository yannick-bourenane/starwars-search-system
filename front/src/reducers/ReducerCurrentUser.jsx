const ReducerCurrentUser = (state = {}, action) => {
  switch (action.type) {
    case "CURRENTUSER":
      state = action.data;
      return state;
    default:
      return state;
  }
};

export default ReducerCurrentUser;
