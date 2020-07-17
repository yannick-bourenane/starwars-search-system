import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchValue } from "../../actions";
import { DebounceInput } from "react-debounce-input";

const SearchBar = () => {
  const search = useSelector((state) => state.searchValue.data);
  const dispatch = useDispatch();
  return (
    <DebounceInput
      minLength={2}
      debounceTimeout={300}
      onChange={(e) => dispatch(searchValue(e.target.value))}
      value={search && search}
    />
  );
};

export default SearchBar;
