import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { typeValues } from "../../actions";
import Axios from "axios";

const FilterByType = () => {
  const types = useSelector((state) => state.typeValues);
  const [allTypes, setAllTypes] = useState([]);
  const dispatch = useDispatch();

  function handleSelectedTypes(type) {
    console.log(type);
    if (types.includes(type)) {
      dispatch(typeValues(types.filter((m) => m !== type)));
    } else {
      dispatch(typeValues([...types, type]));
    }
  }

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/getTypes").then((res) => {
      let arrTypes = [];
      for (let key in res.data) {
        arrTypes.push(key);
      }
      setAllTypes(arrTypes);
    });
  }, []);

  return (
    <>
      {allTypes.length &&
        allTypes.map((type) => (
          <div
            onClick={() => handleSelectedTypes(type)}
            className={
              types.includes(type) ? "is-selected type-" + type : "type-" + type
            }
            key={type}
          >
            {type}
          </div>
        ))}
      {/* <input type="checkbox" onChange={handleSelectedTypes} value="planets" />
      <input type="checkbox" onChange={handleSelectedTypes} value="species" /> */}
    </>
  );
};

export default FilterByType;
