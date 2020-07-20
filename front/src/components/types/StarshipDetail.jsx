import React from "react";
import { Link } from "react-router-dom";

const StarshipDetail = ({ type, infos, linkToType, people }) => {
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
          Pilote{people.length > 1 && "s"} :
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
        {(infos.model && infos.model) !== infos.name && (
          <li>Modèle : {infos.model}</li>
        )}
        {infos.manufacturer && <li>Constructeur : {infos.manufacturer}</li>}
        {infos.cost_in_credits && (
          <li>Coût : {infos.cost_in_credits} crédits</li>
        )}
        {infos.length && <li>Longueur : {infos.length}</li>}
        {infos.max_atmosphering_speed && (
          <li>
            Vitesse maximale en atmosphère : {infos.max_atmosphering_speed}
          </li>
        )}
        {infos.crew && <li>Equipage : {infos.crew}</li>}
        {infos.passengers && <li>Passagers : {infos.passengers}</li>}
      </ul>
    </section>
  );
};

export default StarshipDetail;
