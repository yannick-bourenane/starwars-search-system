import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import LazyLoad from "react-lazyload";

const PlaceholderComponent = () => {
  return (
    <div className={"result result-loading"}>
      <Spinner animation="border" variant="danger" />
    </div>
  );
};

const SearchResults = (props) => {
  const search = useSelector((state) => state.searchValue);
  const types = useSelector((state) => state.typeValues);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilter = useCallback(
    async (apiRes) => {
      try {
        setLoading(true);
        const res = await apiRes;
        if (!!res.data) {
          res.data.data.length === 0
            ? setData("No results")
            : setData(res.data.data);
        } else {
          throw new Error("Error with the search");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        if ("response" in err && err.response.status === 401)
          props.history.push("/");
      }
    },
    [props.history]
  );

  useEffect(() => {
    const cancel = Axios.CancelToken.source();

    (async () => {
      if ((types.length && search) || types.length) {
        const apiRes = Axios.post(
          process.env.REACT_APP_BACKEND_URL + "/search/" + search,
          { types: types },
          { withCredentials: true, cancelToken: cancel.token }
        );
        handleFilter(apiRes);
      } else if (search) {
        const apiRes = Axios.get(
          process.env.REACT_APP_BACKEND_URL + "/search/" + search,
          { withCredentials: true, cancelToken: cancel.token }
        );
        handleFilter(apiRes);
      } else {
        setLoading(false);
        setData(null);
      }
    })();
    return () => {
      cancel.cancel();
    };
  }, [types, search, handleFilter]);

  return (
    <>
      {!loading && data !== null && Array.isArray(data) && data.length > 0 ? (
        data.map((content, i) => (
          <LazyLoad
            height={80}
            offset={100}
            placeholder={<PlaceholderComponent />}
            debounce={100}
            key={i}
          >
            <Link
              to={{
                pathname: "/detailed",
                state: {
                  url: content.url,
                  type: content.type,
                },
              }}
            >
              <div
                className={"result type-" + content.type}
                key={content.name}
                title={content.name}
              >
                <div className="type-icon"></div>
                <h2>{content.name}</h2>
              </div>
            </Link>
          </LazyLoad>
        ))
      ) : !loading && data === null ? (
        <div className="waiting-search-text">
          Type something or select a type of content
        </div>
      ) : !loading && data === "No results" ? (
        <div>No results</div>
      ) : (
        <div className="loading">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
    </>
  );
};

export default withRouter(SearchResults);
