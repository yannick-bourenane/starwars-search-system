import ReducerSearchValue from "./ReducerSearchValue";
import ReducerTypeValues from "./ReducerTypeValues";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  searchValue: ReducerSearchValue,
  typeValues: ReducerTypeValues,
});

export default allReducers;
