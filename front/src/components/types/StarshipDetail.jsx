import React from "react";
import RelatedContent from "../RelatedContent";

const StarshipDetail = ({ type, infos, people }) => {
  const relatedContentArr = [people];
  return (
    <section className={"fiche fiche-" + type}>
      <h1>{infos.name}</h1>
      <ul className="divers">
        {(infos.model && infos.model) !== infos.name && (
          <li>
            <b>Modèle :</b> {infos.model}
          </li>
        )}
        {infos.manufacturer && (
          <li>
            <b>Constructeur :</b> {infos.manufacturer}
          </li>
        )}
        {infos.cost_in_credits && (
          <li>
            <b>Coût :</b> {infos.cost_in_credits} crédits
          </li>
        )}
        {infos.length && (
          <li>
            <b>Longueur :</b> {infos.length}
          </li>
        )}
        {infos.max_atmosphering_speed && (
          <li>
            <b>Vitesse maximale en atmosphère :</b>{" "}
            {infos.max_atmosphering_speed}
          </li>
        )}
        {infos.crew && (
          <li>
            <b>Equipage :</b> {infos.crew}
          </li>
        )}
        {infos.passengers && (
          <li>
            <b>Passagers :</b> {infos.passengers}
          </li>
        )}
      </ul>
      {relatedContentArr.map(
        (related) =>
          related.length > 0 && (
            <RelatedContent related={related} key={related[0].type} />
          )
      )}
    </section>
  );
};

export default StarshipDetail;
