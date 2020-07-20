import React from "react";
import { Link } from "react-router-dom";

const PlanetDetail = ({ type, infos, linkToType, people }) => {
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
      {people.length > 0 && (
        <p>
          Redisent{people.length > 1 && "s"} :
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
        {infos.climate && <li>Climat : {infos.climate}</li>}
        {infos.terrain && <li>Terrain : {infos.terrain}</li>}
        {infos.gravity && <li>Gravité : {infos.gravity}</li>}
        {infos.population && <li>Population : {infos.population}</li>}
      </ul>
    </section>
  );
};

export default PlanetDetail;
