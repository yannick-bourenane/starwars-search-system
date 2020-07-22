import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchValue } from "../../actions";
import { DebounceInput } from "react-debounce-input";

const SearchBar = () => {
  const search = useSelector((state) => state.searchValue);
  const dispatch = useDispatch();
  return (
    <DebounceInput
      className="search"
      minLength={2}
      debounceTimeout={300}
      onChange={(e) => dispatch(searchValue(e.target.value))}
      value={search && search}
      placeholder={"Skywalker..."}
    />
  );
};

export default SearchBar;
