import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { typeValues } from "../actions";

import PeopleDetail from "./types/PeopleDetail";
import FilmDetail from "./types/FilmDetail";
import PlanetDetail from "./types/PlanetDetail";
import SpeciesDetail from "./types/SpeciesDetail";
import StarshipDetail from "./types/StarshipDetail";
import VehicleDetail from "./types/VehicleDetail";

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
    if ("species" in infos && infos.species.length) getSpecies(infos.species);
    if ("homeworld" in infos && infos.homeworld.length)
      getHomeWorld([infos.homeworld]);
    if ("planets" in infos && infos.planets.length) getHomeWorld(infos.planets);
    if ("vehicles" in infos && infos.vehicles.length)
      getVehicles(infos.vehicles);
    if ("starships" in infos && infos.starships.length)
      getStarships(infos.starships);
    if ("characters" in infos && infos.characters.length)
      getPeople(infos.characters);
    if ("pilots" in infos && infos.pilots.length) getPeople(infos.pilots);
    if ("people" in infos && infos.people.length) getPeople(infos.people);
    if ("residents" in infos && infos.residents.length)
      getPeople(infos.residents);
  };
  useEffect(() => {
    if (Object.keys(infos).length > 0) getDeepInfos();
  }, [infos]);

  const getSpecificData = async () => {
    let fetchData = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/specific",
      { url: props.location.state.url },
      { withCredentials: true } // props.url
    )
      .then((res) => setInfos(res.data))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) props.history.push("/");
      });
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
  }, [props.location.state.url]);

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
          {props.location.state.type === "films" && (
            <FilmDetail
              people={people}
              type={props.location.state.type}
              infos={infos}
              linkToType={linkToType}
              species={species}
              planets={homeWorld}
              vehicles={vehicles}
              starships={starships}
            />
          )}
          {props.location.state.type === "planets" && (
            <PlanetDetail
              people={people}
              type={props.location.state.type}
              infos={infos}
              linkToType={linkToType}
            />
          )}
          {props.location.state.type === "species" && (
            <SpeciesDetail
              people={people}
              type={props.location.state.type}
              infos={infos}
              linkToType={linkToType}
              homeWorld={homeWorld}
            />
          )}
          {props.location.state.type === "starships" && (
            <StarshipDetail
              people={people}
              type={props.location.state.type}
              infos={infos}
              linkToType={linkToType}
            />
          )}
          {props.location.state.type === "vehicles" && (
            <VehicleDetail
              people={people}
              type={props.location.state.type}
              infos={infos}
              linkToType={linkToType}
            />
          )}
        </>
      )}
    </>
  );
};

export default withRouter(DetailedSheet);
