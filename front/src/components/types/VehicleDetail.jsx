import React from "react";
import RelatedContent from "../RelatedContent";

const VehicleDetail = ({ type, infos, people }) => {
  const relatedContentArr = [people];
  return (
    <section className={"fiche fiche-" + type}>
      <h1>{infos.name}</h1>
      <ul className="divers">
        {(infos.model && infos.model) !== infos.name && (
          <li>
            <b>Model :</b> {infos.model}
          </li>
        )}
        {infos.manufacturer && (
          <li>
            <b>Manufacturer :</b> {infos.manufacturer}
          </li>
        )}
        {infos.cost_in_credits && (
          <li>Cost : {infos.cost_in_credits} credits</li>
        )}
        {infos.length && (
          <li>
            <b>Length :</b> {infos.length}
          </li>
        )}
        {infos.max_atmosphering_speed && (
          <li>
            <b>Max atmosphering speed :</b> {infos.max_atmosphering_speed}
          </li>
        )}
        {infos.crew && <li>Crew : {infos.crew}</li>}
        {infos.passengers && (
          <li>
            <b>Passengers :</b> {infos.passengers}
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

export default VehicleDetail;
