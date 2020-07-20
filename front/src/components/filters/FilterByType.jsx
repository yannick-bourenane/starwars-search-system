import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { typeValues } from "../../actions";
import Axios from "axios";

const FilterByType = (props) => {
  const types = useSelector((state) => state.typeValues);
  const [allTypes, setAllTypes] = useState([]);
  const dispatch = useDispatch();

  function handleSelectedTypes(type) {
    if (types.includes(type)) {
      dispatch(typeValues(types.filter((m) => m !== type)));
    } else {
      dispatch(typeValues([...types, type]));
    }
  }

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/getTypes", {
      withCredentials: true,
    })
      .then((res) => {
        let arrTypes = [];
        for (let key in res.data) {
          arrTypes.push(key);
        }
        setAllTypes(arrTypes);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) props.history.push("/");
      });
  }, []);

  return (
    <div className="all-types">
      {allTypes.length &&
        allTypes.map((type) => (
          <div
            onClick={() => handleSelectedTypes(type)}
            className={
              types.includes(type)
                ? "is-selected type type-" + type
                : "type type-" + type
            }
            key={type}
          >
            {type}
          </div>
        ))}
    </div>
  );
};

export default withRouter(FilterByType);
