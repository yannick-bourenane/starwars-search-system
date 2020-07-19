import ReducerSearchValue from "./ReducerSearchValue";
import ReducerTypeValues from "./ReducerTypeValues";
import ReducerCurrentUser from "./ReducerCurrentUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  searchValue: ReducerSearchValue,
  typeValues: ReducerTypeValues,
  currentUser: ReducerCurrentUser,
});

export default allReducers;
