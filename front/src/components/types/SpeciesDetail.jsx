import React from "react";
import { Link } from "react-router-dom";

const SpeciesDetail = ({ type, infos, linkToType, people, homeWorld }) => {
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
      {homeWorld.length > 0 && (
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
      {people.length > 0 && (
        <p>
          People :
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
        {infos.classification && (
          <li>Classification : {infos.classification}</li>
        )}
        {infos.average_height && (
          <li>Taille moyenne : {infos.average_height}</li>
        )}
        {infos.skin_colors && <li>Couleur de peau : {infos.skin_colors}</li>}
        {infos.hair_colors && <li>Couleur de cheveux : {infos.hair_colors}</li>}
        {infos.eye_colors && <li>Couleur des yeux : {infos.eye_colors}</li>}
        {infos.average_lifespan && (
          <li>Durée de vie moyenne : {infos.average_lifespan}</li>
        )}
        {infos.language && <li>Langage : {infos.language}</li>}
      </ul>
    </section>
  );
};

export default SpeciesDetail;
