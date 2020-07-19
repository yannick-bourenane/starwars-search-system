import React from "react";

import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import SearchBar from "../components/filters/SearchBar";
import FilterByType from "../components/filters/FilterByType";
import SearchResults from "../components/SearchResults";

const Search = () => {
  return (
    <>
      <Container>
        <Header />
        <SearchBar />
        <FilterByType />
        <SearchResults />
      </Container>
      {/* <div onClick={handleSearch}>access private content</div>
      <div onClick={handleFilter}>access planets and films only</div> */}
    </>
  );
};

export default Search;
