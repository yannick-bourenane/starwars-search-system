import React from "react";
import { Link } from "react-router-dom";

const PeopleDetail = ({
  type,
  infos,
  linkToType,
  species,
  homeWorld,
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
      <h2>
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
      </h2>
      {homeWorld.length && (
        <p>
          Homeworld :
          {homeWorld.map((hw) => (
            <Link
              key={hw.name}
              to={{
                pathname: "/detailed",
                state: {
                  url: hw.url,
                  type: "planets",
                },
              }}
            >
              {hw.name}
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
      <ul className="divers">
        {infos.gender && <li>Genre : {infos.gender}</li>}
        {infos.birth_year && <li>Date de naissance : {infos.birth_year}</li>}
        {infos.mass && <li>Poids : {infos.mass}</li>}
        {infos.height && <li>Taille : {infos.height}</li>}
      </ul>
    </section>
  );
};

export default PeopleDetail;
