import React from "react";
import RelatedContent from "../RelatedContent";

const SpeciesDetail = ({ type, infos, people, homeWorld }) => {
  const relatedContentArr = [people, homeWorld];
  return (
    <section className={"fiche fiche-" + type}>
      <h1>{infos.name}</h1>
      <ul className="divers">
        {infos.classification && (
          <li>
            <b>Classification :</b> {infos.classification}
          </li>
        )}
        {infos.average_height && (
          <li>
            <b>Average height :</b> {infos.average_height}
          </li>
        )}
        {infos.skin_colors && (
          <li>
            <b>Skin colors :</b> {infos.skin_colors}
          </li>
        )}
        {infos.hair_colors && (
          <li>
            <b>Hair colors :</b> {infos.hair_colors}
          </li>
        )}
        {infos.eye_colors && (
          <li>
            <b>Eye colors :</b> {infos.eye_colors}
          </li>
        )}
        {infos.average_lifespan && (
          <li>
            <b>Average lifespan :</b> {infos.average_lifespan}
          </li>
        )}
        {infos.language && (
          <li>
            <b>Language :</b> {infos.language}
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

export default SpeciesDetail;
