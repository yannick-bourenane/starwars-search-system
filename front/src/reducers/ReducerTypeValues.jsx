const ReducerTypeValues = (state = [], action) => {
  switch (action.type) {
    case "TYPEVALUES":
      state = action.data;
      return state;
    default:
      return state;
  }
};

export default ReducerTypeValues;
