import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import SearchBar from "../components/filters/SearchBar";
import FilterByType from "../components/filters/FilterByType";
import SearchResults from "../components/SearchResults";
import "../styles/search.css";

const Search = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading)
    return <div className="flex-center-column loading">Loading...</div>;
  if (!isLoggedIn) return <Redirect to="/" />;

  return (
    <>
      <Container>
        <Header />
        <SearchBar />
        <FilterByType />
        <section className="search-results">
          <SearchResults />
        </section>
      </Container>
    </>
  );
};

export default Search;
