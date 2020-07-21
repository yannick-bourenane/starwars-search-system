import React from "react";
import RelatedContent from "../RelatedContent";

const VehicleDetail = ({ type, infos, people }) => {
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
          <li>Model : {infos.model}</li>
        )}
        {infos.manufacturer && <li>Manufacturer : {infos.manufacturer}</li>}
        {infos.cost_in_credits && (
          <li>Cost : {infos.cost_in_credits} credits</li>
        )}
        {infos.length && <li>Length : {infos.length}</li>}
        {infos.max_atmosphering_speed && (
          <li>Max atmosphering speed : {infos.max_atmosphering_speed}</li>
        )}
        {infos.crew && <li>Crew : {infos.crew}</li>}
        {infos.passengers && <li>Passengers : {infos.passengers}</li>}
      </ul>
    </section>
  );
};

export default VehicleDetail;
