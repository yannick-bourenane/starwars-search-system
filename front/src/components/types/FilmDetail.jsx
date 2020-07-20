import React from "react";
import { Link } from "react-router-dom";

const FilmDetail = ({
  type,
  infos,
  linkToType,
  people,
  species,
  planets,
  vehicles,
  starships,
}) => {
  return (
    <section className={"fiche fiche-" + type}>
      <div className={"ariane"}>
        <Link to="/search">Search</Link> >{" "}
        <Link to="/search" onClick={() => linkToType(type)}>
          {type}
        </Link>{" "}
        > {infos.name}
      </div>
      <h1>{infos.name}</h1>
      {species.length > 0 && (
        <p>
          {species.map((oneSpecies) => (
            <Link
              key={oneSpecies.name}
              to={{
                pathname: "/detailed",
                state: {
                  url: oneSpecies.url,
                  type: "species",
                },
              }}
            >
              {oneSpecies.name}
            </Link>
          ))}
        </p>
      )}
      {vehicles.length > 0 && (
        <p>
          Véhicule{vehicles.length > 1 && "s"} :
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.name}
              to={{
                pathname: "/detailed",
                state: {
                  url: vehicle.url,
                  type: "vehicles",
                },
              }}
            >
              {vehicle.name}
            </Link>
          ))}
        </p>
      )}
      {starships.length > 0 && (
        <p>
          Starship{starships.length > 1 && "s"} :
          {starships.map((starship) => (
            <Link
              key={starship.name}
              to={{
                pathname: "/detailed",
                state: {
                  url: starship.url,
                  type: "starships",
                },
              }}
            >
              {starship.name}
            </Link>
          ))}
        </p>
      )}
      {planets.length > 0 && (
        <p>
          Planète{planets.length > 1 && "s"} :
          {planets.map((planet) => (
            <Link
              key={planet.name}
              to={{
                pathname: "/detailed",
                state: {
                  url: planet.url,
                  type: "planets",
                },
              }}
            >
              {planet.name}
            </Link>
          ))}
        </p>
      )}
      {people.length > 0 && (
        <p>
          Character{people.length > 1 && "s"} :
          {people.map((onePeople) => (
            <Link
              key={onePeople.name}
              to={{
                pathname: "/detailed",
                state: {
                  url: onePeople.url,
                  type: "people",
                },
              }}
            >
              {onePeople.name}
            </Link>
          ))}
        </p>
      )}
      <ul className="divers">
        {infos.episode_id && <li>Film n° : {infos.episode_id}</li>}
        {infos.director && <li>Directeur : {infos.director}</li>}
        {infos.producer && <li>Producteur : {infos.producer}</li>}
        {infos.release_date && <li>Date de sortie : {infos.release_date}</li>}
      </ul>
    </section>
  );
};

export default FilmDetail;
