import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchValue } from "../../actions";
import { DebounceInput } from "react-debounce-input";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const search = useSelector((state) => state.searchValue);
  const dispatch = useDispatch();
  return (
    <div className="search-bar">
      <DebounceInput
        className="search"
        minLength={2}
        debounceTimeout={300}
        onChange={(e) => dispatch(searchValue(e.target.value))}
        value={search && search}
        placeholder={"Skywalker..."}
        size="lg"
        type="text"
        aria-label="Search"
        aria-describedby="search-icon"
        required
      />
      <div className="search-icon">
        <BsSearch />
      </div>
    </div>
  );
};

export default SearchBar;
