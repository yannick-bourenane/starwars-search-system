export const searchValue = (data) => {
  return {
    type: "SEARCHVALUE",
    data: data,
  };
};
export const typeValues = (arr) => {
  return {
    type: "TYPEVALUES",
    data: arr,
  };
};
export const currentUser = (obj) => {
  return {
    type: "CURRENTUSER",
    data: obj,
  };
};
