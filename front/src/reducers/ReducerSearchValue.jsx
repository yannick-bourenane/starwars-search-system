const ReducerSearchValue = (state = "", action) => {
  switch (action.type) {
    case "SEARCHVALUE":
      state = action.data;
      return state;
    default:
      return state;
  }
};

export default ReducerSearchValue;
