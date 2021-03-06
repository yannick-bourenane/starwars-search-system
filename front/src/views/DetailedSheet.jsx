import React, { useState, useEffect, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { typeValues } from "../actions";
import { searchValue } from "../actions";

import "../styles/detail.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import withSpaceBackground from "../hoc/withSpaceBackground";

import Header from "../components/Header";
import PeopleDetail from "../components/types/PeopleDetail";
import FilmDetail from "../components/types/FilmDetail";
import PlanetDetail from "../components/types/PlanetDetail";
import SpeciesDetail from "../components/types/SpeciesDetail";
import StarshipDetail from "../components/types/StarshipDetail";
import VehicleDetail from "../components/types/VehicleDetail";

const DetailedSheet = (props) => {
  const dispatch = useDispatch();
  const [infos, setInfos] = useState({});
  const [loading, setLoading] = useState(false);

  const [people, setPeople] = useState([]);
  const [species, setSpecies] = useState([]);
  const [homeWorld, setHomeWorld] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  const getSpecies = useCallback(async (obj) => {
    let result = await linkToSpecific(obj);
    setSpecies(result);
  }, []);
  const getVehicles = useCallback(async (obj) => {
    let result = await linkToSpecific(obj);
    setVehicles(result);
  }, []);
  const getStarships = useCallback(async (obj) => {
    let result = await linkToSpecific(obj);
    setStarships(result);
  }, []);

  const getHomeWorld = useCallback(async (obj) => {
    let result = await linkToSpecific(obj);
    setHomeWorld(result);
  }, []);
  const getPeople = useCallback(async (obj) => {
    let result = await linkToSpecific(obj);
    setPeople(result);
  }, []);

  const getDeepInfos = useCallback(() => {
    if ("species" in infos && infos.species.length)
      getSpecies({ type: "species", arr: infos.species });
    else setSpecies([]);

    if ("homeworld" in infos && infos.homeworld)
      getHomeWorld({
        type: "planets",
        label: "homeworld",
        arr: [infos.homeworld],
      });
    else setHomeWorld([]);

    if ("planets" in infos && infos.planets.length)
      getHomeWorld({ type: "planets", arr: infos.planets });
    else setHomeWorld([]);

    if ("vehicles" in infos && infos.vehicles.length)
      getVehicles({ type: "vehicles", arr: infos.vehicles });
    else setVehicles([]);

    if ("starships" in infos && infos.starships.length)
      getStarships({ type: "starships", arr: infos.starships });
    else setStarships([]);

    if ("characters" in infos && infos.characters.length)
      getPeople({
        type: "people",
        label: "characters",
        arr: infos.characters,
      });
    else setPeople([]);

    if ("pilots" in infos && infos.pilots.length)
      getPeople({ type: "people", label: "pilots", arr: infos.pilots });
    else setPeople([]);

    if ("people" in infos && infos.people.length)
      getPeople({ type: "people", arr: infos.people });
    else setPeople([]);

    if ("residents" in infos && infos.residents.length)
      getPeople({ type: "people", label: "residents", arr: infos.residents });
    else setPeople([]);
  }, [infos, getSpecies, getVehicles, getStarships, getHomeWorld, getPeople]);
  useEffect(() => {
    if (Object.keys(infos).length > 0) getDeepInfos();
  }, [infos, getDeepInfos]);

  const getSpecificData = useCallback(async () => {
    setLoading(true);
    let fetchData = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/specific",
      { url: props.location.state.url },
      { withCredentials: true }
    )
      .then((res) => {
        setInfos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if ("response" in err && err.response.status === 401)
          props.history.push("/");
      });
    return fetchData;
  }, [props.history, props.location.state.url]);
  const linkBreadcrumb = (type) => {
    dispatch(searchValue(""));
    dispatch(typeValues(type));
  };

  const linkToSpecific = async (obj) => {
    let promiseArray = obj.arr.map((url) =>
      Axios.get(url)
        .then((res) => {
          return {
            url: res.data.url,
            name: res.data.name || res.data.title,
            type: obj.type,
            label: obj.label || obj.type,
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
  }, [props.location.state.url, getSpecificData]);

  return (
    <Container>
      <Header />
      <Row>
        {!loading ? (
          <Col md={{ span: 8, offset: 2 }}>
            <div className="detail-nav">
              <div className={"result-breadcrumb"}>
                {/* <Link to="/search" onClick={() => linkBreadcrumb([])}>
                  Search
                </Link>{" "}
                /{" "} */}
                <Link
                  to="/search"
                  onClick={() => linkBreadcrumb([props.location.state.type])}
                >
                  {props.location.state.type}
                </Link>{" "}
                / {infos.name || infos.title}
              </div>
            </div>
            {Object.keys(infos).length > 0 && (
              <>
                {props.location.state.type === "people" && (
                  <PeopleDetail
                    type={props.location.state.type}
                    infos={infos}
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
                  />
                )}
                {props.location.state.type === "species" && (
                  <SpeciesDetail
                    people={people}
                    type={props.location.state.type}
                    infos={infos}
                    homeWorld={homeWorld}
                  />
                )}
                {props.location.state.type === "starships" && (
                  <StarshipDetail
                    people={people}
                    type={props.location.state.type}
                    infos={infos}
                  />
                )}
                {props.location.state.type === "vehicles" && (
                  <VehicleDetail
                    people={people}
                    type={props.location.state.type}
                    infos={infos}
                  />
                )}
              </>
            )}
          </Col>
        ) : (
          <Col md={{ span: 8, offset: 2 }}>
            <Spinner animation="border" variant="danger" />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default withSpaceBackground(withRouter(DetailedSheet));
