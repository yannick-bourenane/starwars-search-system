import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchResults = (props) => {
  const search = useSelector((state) => state.searchValue);
  const types = useSelector((state) => state.typeValues);
  const [data, setData] = useState([]);

  const handleFilter = async () => {
    try {
      const apiRes = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/search/" + search,
        { types: types },
        { withCredentials: true }
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
      if (err.response.status === 401) props.history.push("/");
    }
  };
  const handleSearch = async () => {
    try {
      const apiRes = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/search/" + search,
        { withCredentials: true }
      );
      if (!!apiRes.data) {
        setData(apiRes.data.data);
      } else {
        throw new Error("Error with the search");
      }
    } catch (err) {
      console.log("err = " + err);
      if (err.response.status === 401) props.history.push("/");
    }
  };

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
          <Link
            to={{
              pathname: "/detailed",
              state: {
                url: content.url,
                type: content.type,
              },
            }}
          >
            <div className={"result type-" + content.type} key={content.name}>
              <h2>{content.name}</h2>
              {content.model && <h3>Modèle : {content.model}</h3>}
              <h4>{content.type}</h4>
            </div>
          </Link>
        ))
      ) : (
        <div>No results</div>
      )}
    </>
  );
};

export default withRouter(SearchResults);
