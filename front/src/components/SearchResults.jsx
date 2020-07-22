import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchResults = (props) => {
  const search = useSelector((state) => state.searchValue);
  const types = useSelector((state) => state.typeValues);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilter = async (cancel) => {
    try {
      setLoading(true);
      const apiRes = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/search/" + search,
        { types: types },
        { withCredentials: true, cancelToken: cancel.token }
      );
      if (!!apiRes.data) {
        apiRes.data.data.length === 0
          ? setData("No results")
          : setData(apiRes.data.data);
      } else {
        throw new Error("Error with the search");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      if ("response" in err && err.response.status === 401)
        props.history.push("/");
    }
  };
  const handleSearch = async (cancel) => {
    try {
      const apiRes = await Axios.get(
        process.env.REACT_APP_BACKEND_URL + "/search/" + search,
        { withCredentials: true, cancelToken: cancel.token }
      );
      if (!!apiRes.data) {
        apiRes.data.data.length === 0
          ? setData("No results")
          : setData(apiRes.data.data);
      } else {
        throw new Error("Error with the search");
      }
    } catch (err) {
      console.log(err);
      if ("response" in err && err.response.status === 401)
        props.history.push("/");
    }
  };

  useEffect(() => {
    const cancel = Axios.CancelToken.source();
    (async () => {
      (types.length && search) || types.length
        ? handleFilter(cancel)
        : search
        ? handleSearch(cancel)
        : setData(null);
    })();
    return () => {
      cancel.cancel();
    };
  }, [types, search]);

  return (
    <>
      {!loading && data !== null && Array.isArray(data) && data.length > 0 ? (
        data.map((content, i) => (
          <Link
            key={i}
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
      ) : !loading && data === null ? (
        <div>Type something or select a type of content</div>
      ) : !loading && data === "No results" ? (
        <div>No results</div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default withRouter(SearchResults);
