import React from "react";
import RelatedContent from "../RelatedContent";

const PlanetDetail = ({ type, infos, people }) => {
  const relatedContentArr = [people];
  return (
    <section className={"fiche fiche-" + type}>
      <h1>{infos.name}</h1>
      <ul className="divers">
        {infos.climate && (
          <li>
            <b>Climate :</b> {infos.climate}
          </li>
        )}
        {infos.terrain && (
          <li>
            <b>Terrain :</b> {infos.terrain}
          </li>
        )}
        {infos.gravity && (
          <li>
            <b>Gravity :</b> {infos.gravity}
          </li>
        )}
        {infos.population && (
          <li>
            <b>Population :</b> {infos.population}
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

export default PlanetDetail;
