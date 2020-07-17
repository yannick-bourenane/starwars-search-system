import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { typeValues } from "../../actions";

const FilterByType = () => {
  const types = useSelector((state) => state.typeValues);
  const dispatch = useDispatch();

  function handleSelectedTypes(e) {
    if (types.includes(e.target.value)) {
      dispatch(typeValues(types.filter((m) => m !== e.target.value)));
    } else {
      dispatch(typeValues([...types, e.target.value]));
    }
  }

  return (
    <>
      <input type="checkbox" onChange={handleSelectedTypes} value="Planets" />
      <input type="checkbox" onChange={handleSelectedTypes} value="Species" />
    </>
  );
};

export default FilterByType;
