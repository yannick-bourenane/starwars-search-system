import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const search = useSelector((state) => state.searchValue);
  const types = useSelector((state) => state.typeValues);
  const [data, setData] = useState([]);

  const handleFilter = async () => {
    try {
      const apiRes = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/search/" + search,
        { types: types }
      );
      console.log("apires = " + apiRes.data);
      if (!!apiRes.data) {
        console.log(apiRes.data);
        setData(apiRes.data.data);
      } else {
        throw new Error("Error with the search");
      }
    } catch (err) {
      console.log("err = " + err);
    }
  };
  const handleSearch = async () => {
    try {
      const apiRes = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/search/" + search
      );
      console.log("apires = " + apiRes.data);
      if (!!apiRes.data) {
        console.log(apiRes.data);
        setData(apiRes.data.data);
      } else {
        throw new Error("Error with the search");
      }
    } catch (err) {
      console.log("err = " + err);
    }
  };

  // useEffect(() => {
  //   search && handleSearch();
  // }, [search]);

  useEffect(() => {
    (types.length && search) || types.length
      ? handleFilter()
      : search
      ? handleSearch()
      : setData([]);
  }, [types, search]);

  return (
    <>
      {data.length ? (
        data.map((content) => (
          <div key={content.name}>
            <Link
              to={{
                pathname: "/detailed",
                state: {
                  url: content.url,
                  type: content.type,
                },
              }}
            >
              {content.name}
            </Link>
          </div>
        ))
      ) : (
        <div>No results</div>
      )}
    </>
  );
};

export default SearchResults;
