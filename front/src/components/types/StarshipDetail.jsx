import React from "react";
import RelatedContent from "../RelatedContent";

const StarshipDetail = ({ type, infos, people }) => {
  const relatedContentArr = [people];
  return (
    <section className={"fiche fiche-" + type}>
      <h1>{infos.name}</h1>
      {relatedContentArr.map(
        (related) =>
          related.length > 0 && (
            <RelatedContent related={related} key={related[0].type} />
          )
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
