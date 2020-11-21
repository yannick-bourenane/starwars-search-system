import React from "react";
import RelatedContent from "../RelatedContent";

const PeopleDetail = ({
  type,
  infos,
  species,
  homeWorld,
  vehicles,
  starships,
}) => {
  const relatedContentArr = [species, homeWorld, vehicles, starships];
  return (
    <section className={"fiche fiche-" + type}>
      <h1>{infos.name}</h1>
      <ul className="divers">
        {infos.gender && (
          <li>
            <b>Gender :</b> {infos.gender}
          </li>
        )}
        {infos.birth_year && (
          <li>
            <b>Birth year :</b> {infos.birth_year}
          </li>
        )}
        {infos.mass && (
          <li>
            <b>Mass :</b> {infos.mass}
          </li>
        )}
        {infos.height && (
          <li>
            <b>Height :</b> {infos.height}
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

export default PeopleDetail;
