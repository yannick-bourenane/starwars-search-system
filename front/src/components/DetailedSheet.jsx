import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { typeValues } from "../actions";

import PeopleDetail from "./types/PeopleDetail";

const DetailedSheet = (props) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState({});

  const [people, setPeople] = useState([]);
  const [species, setSpecies] = useState([]);
  const [homeWorld, setHomeWorld] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  const getSpecies = async (arr) => {
    let result = await linkToSpecific(arr);
    setSpecies(result);
  };
  const getVehicles = async (arr) => {
    let result = await linkToSpecific(arr);
    setVehicles(result);
  };
  const getStarships = async (arr) => {
    let result = await linkToSpecific(arr);
    setStarships(result);
  };

  const getHomeWorld = async (arr) => {
    let result = await linkToSpecific(arr);
    setHomeWorld(result);
  };
  const getPeople = async (arr) => {
    let result = await linkToSpecific(arr);
    setPeople(result);
  };

  const getDeepInfos = () => {
    if (infos.species.length) getSpecies(infos.species);
    if (infos.homeworld.length) getHomeWorld([infos.homeworld]);
    if (infos.vehicles.length) getVehicles(infos.vehicles);
    if (infos.starships.length) getStarships(infos.starships);
    if (infos.characters.length) getPeople(infos.characters);
  };
  useEffect(() => {
    if (Object.keys(infos).length > 0) getDeepInfos();
  }, [infos]);

  const getSpecificData = async () => {
    let fetchData = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/specific",
      { url: props.location.state.url } // props.url
    )
      .then((res) => setInfos(res.data))
      .catch((err) => console.log(err));
    return fetchData;
  };

  const linkToType = (type) => {
    dispatch(typeValues([type]));
  };

  const linkToSpecific = async (UrlsArray) => {
    let promiseArray = UrlsArray.map((url) =>
      Axios.get(url)
        .then((res) => {
          return {
            url: res.data.url,
            name: res.data.name || res.data.title,
          };
        })
        .catch((err) => console.log(err))
    );
    let results = await Promise.all(promiseArray)
      .then((all) => all)
      .catch((err) => console.log(err));
    return results;
  };

  useEffect(() => {
    getSpecificData();
  }, []);
  return (
    <>
      {Object.keys(infos).length > 0 && (
        <>
          {props.location.state.type === "people" && (
            <PeopleDetail
              type={props.location.state.type}
              infos={infos}
              linkToType={linkToType}
              species={species}
              homeWorld={homeWorld}
              vehicles={vehicles}
              starships={starships}
            />
          )}
          }
        </>
      )}
    </>
  );
};

export default DetailedSheet;
